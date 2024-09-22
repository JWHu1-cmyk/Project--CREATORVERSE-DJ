import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useLoaderData } from 'react-router-dom';
import { getCreators } from '../Creator1';
import CreatorListItem from './CreatorListItem';
import axios from 'axios';

// Configure Axios
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;  // Uncomment if needed

export async function loader() {
  try {
    const contacts = await getCreators();
    return { contacts };
  } catch (error) {
    console.error("Failed to load contacts:", error);
    return { contacts: [] }; // Return an empty array on error
  }
}

export default function ShowCreators() {
  const [results, setResults] = useState([]);
  const [contacts, setContacts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const loaderData = useLoaderData();

  useEffect(() => {
    if (query) {
      const encodedQuery = encodeURIComponent(query);
      axios.get(`${API_URL}search?q=${encodedQuery}/`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      })
      .then(response => {
        console.log('Raw response:', response);
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
        }
      });
    } else {
      setContacts(loaderData.contacts);
    }
  }, [query, loaderData.contacts]);
  // axios.get('/api/creatorss/')
  // axios.get(`/search?q=${query}/`)

  const itemsToDisplay = query ? results : contacts;
  console.log('itemsToDisplay:', itemsToDisplay);

  return (
    <div className="container mt-4">
      <h1>{query ? "Search Results" : "All Creators"}</h1>
      <ul className="list-group mt-4">
        {itemsToDisplay.map((item) => (
          <CreatorListItem key={item.id} item={item} />
        ))}
      </ul>
      {!query && <Outlet />}
    </div>
  );
}