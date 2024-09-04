// import supabase from "./client.js";
import axios from "axios";

export async function getCreators() {
  // hu: good

  try {
    const response = await axios.get('/api/creators/');
    return response.data;
  } catch (error) {
    console.error("Error fetching creators:", error);
    const errorMessage = error.response?.data?.message || error.message;
    alert("Error fetching creators: " + errorMessage);
    throw error;
  }
}

export async function deleteCreator(id) {
  // hu: good
  try {

    try {
      const response = await axios.delete(`/api/creators/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting creator:", error.message);
      return null;
    }

  } catch (error) {
    console.error("Error deleting creator:", error.message);
    return null;
  }
}

export async function updateCreator(id, name, url, description, imageURL) {
  try {
    // First, get the current item
    const getResponse = await axios.get(`/api/creators/${id}`);
    let item = getResponse.data;

    // Update the item with new values
    item = {
      ...item,
      name: name,
      url: url,
      description: description,
      imageURL: imageURL
    };

    // Send the updated item back to the server
    const putResponse = await axios.put(`/api/creators/${id}`, item);
    
    return putResponse.data;
  } catch (error) {
    console.error("Error updating creator:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
}

export async function createCreator(form) {
  // hu: good
  try {
    let creator_id = Math.floor(Math.random() * 32768);

    // Properties to add or update
    let updates = {
      id: creator_id,
      created_at: new Date(), // Use ISO string for date
    };

    // Adding multiple properties using Object.assign()
    let creator = Object.assign({}, form, updates);

    //
    try {
      const response = await axios.post('/api/creators/', creator);
      console.log("Creator inserted successfully:", response.data);
      alert("Creator inserted successfully!");
      return response.data; // This contains the newly created creator, including server-generated fields
    } catch (error) {
      console.error("Error inserting creator:", error);
      const errorMessage = error.response?.data?.message || error.message;
      alert("Error inserting creator: " + errorMessage);
      throw error; // Re-throw the error to be caught by the action function
    }

  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Unexpected error: " + error.message);
  }

  return;
}

// Function to simulate form submission and call createCreator
async function testCreator() {
  // ***
  // Simulated form data
  // const form = {
  //   name: 'John Doe',

  //   description: 'A sample creator description',
  //   imageURL: 'https://johndoe.com/image.jpg'
  // };

  // // Call createCreator with the simulated form data
  // await createCreator(form);

  // // ***
  // const id = 8651

  // // Call deleteCreators with the simulated form data
  // await deleteCreators(id);

  // // ***
  // const creators = await getCreators();
  // console.log(creators);

  // ***
  // Simulated form data
  const form = {
    id: '22489',
    name: 'jay',
    imageURL: 'https://johndoe.com/image.jpg'
  };

  console.log(form.description);

  // Call createCreator with the simulated form data
  await updateCreator(form.id, form.name, form.url, form.description, form.imageURL);

}

// Run the test
testCreator();