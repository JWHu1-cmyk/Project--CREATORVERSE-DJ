import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getCreators, updateCreator } from "../Creator1";

export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    // Validate form fields
    const requiredFields = ['name', 'url', 'description', 'imageURL'];
    const emptyFields = requiredFields.filter(field => !updates[field] || updates[field].trim() === '');

    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
      return { error: errorMessage };
    }

    // Attempt to update the creator and handle potential errors
    await updateCreator(
      Number(params.creatorId),
      updates.name.trim(),
      updates.url.trim(),
      updates.description.trim(),
      updates.imageURL.trim()
    );

    return redirect(`/showCreators`);
  } catch (error) {
    console.error("Error updating creator:", error);
    return { error: "Error updating creator: " + error.message };
  }
}

export async function loader({ params }) {
  const creators = await getCreators();

  if (!creators) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  const creator = creators.find((creator) => creator.id === Number(params.creatorId));

  if (!creator) {
    throw new Response("", {
      status: 404,
      statusText: "Creator Not Found",
    });
  }

  return { creator };
}

export default function EditCreator() {
  const { creator } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="edit-form" className="container mt-5">
      <div className="mb-3">
        <label className="form-label">
          <span>Name: </span>
        </label>
        <input
          name="name"
          placeholder="Enter name"
          defaultValue={creator?.name}
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
          defaultValue={creator?.url}
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
          defaultValue={creator?.description}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <span>Image URL: </span>
        </label>
        <input
          name="imageURL"
          placeholder="Enter Image URL"
          defaultValue={creator?.imageurl}
          className="form-control"
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-dark px-4 py-2 me-2">
          Save
        </button>
        <button 
          type="button" 
          className="btn btn-dark px-4 py-2 ms-2"
          onClick={() => navigate("/showCreators")}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
