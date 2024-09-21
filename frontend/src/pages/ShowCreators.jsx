import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useLoaderData } from 'react-router-dom';
import { getCreators } from '../Creator1';
import CreatorListItem from './CreatorListItem';

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
    console.log('Hello!');
    if (query) {
      fetch(`/search?q=${query}`)
        .then(response => {
          console.log('Raw response:', response);
          return response.json();
        })
        .then(data => setResults(data))
        .catch(error => console.error('Error fetching search results:', error));
    } else {
      setContacts(loaderData.contacts);
    }
  }, [query, loaderData.contacts]);

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