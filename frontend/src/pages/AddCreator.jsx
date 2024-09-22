import {
  Form,
  useNavigate,
  redirect,
} from "react-router-dom";
import { createCreator } from "../Creator1.js";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    // Validate form fields
    const requiredFields = ['name', 'url', 'description', 'imageurl'];
    const emptyFields = requiredFields.filter(field => !updates[field] || updates[field].trim() === '');

    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
      console.log(errorMessage);
      alert(errorMessage);
      return null; // Return null to prevent form submission
    }

    // Attempt to create the creator and handle potential errors
    await createCreator({
      name: updates.name.trim(),
      url: updates.url.trim(),
      description: updates.description.trim(),
      imageurl: updates.imageurl.trim()
    });

    return redirect(`/showCreators`);
  } catch (error) {
    console.error("Error creating creator:", error);
    alert("Error creating creator: " + error.message);
    return null; // Return null to prevent form submission
  }
}

export default function AddCreator() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form" className="container mt-5">
      <div className="mb-3">
        <label className="form-label">
          <span>Name: </span>
        </label>
        <input 
          name="name" 
          placeholder="Enter name" 
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <span>URL: </span>
        </label>
        <input 
          name="url" 
          placeholder="Enter URL" 
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <span>Description: </span>
        </label>
        <textarea 
          name="description" 
          rows={6} 
          placeholder="Enter description"
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <span>Image URL: </span>
        </label>
        <input 
          name="imageurl" 
          placeholder="Enter Image URL" 
          className="form-control" 
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-dark px-4 py-2 me-2">Save</button>
        <button 
          type="button" 
          className="btn btn-dark px-4 py-2 ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
