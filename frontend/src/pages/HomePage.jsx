import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="container mt-5">
 
      <h1 className="text-center mb-4">CREATORVERSE</h1>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="d-flex justify-content-center mb-4" style={{ width: '100%', maxWidth: '300px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search creators..."
            style={{ marginRight: '10px' }}
          />
          <button type="button" className="btn btn-dark">
              SEARCH
          </button>
        </div>
        <Link to="showCreators" className="mb-3 w-100" style={{ maxWidth: '300px' }}>
          <button type="button" className="btn btn-dark w-100 px-4 py-2">
            VIEW ALL CREATORS
          </button>
        </Link>
        <Link to="addCreator" className="w-100" style={{ maxWidth: '300px' }}>
          <button type="button" className="btn btn-dark w-100 px-4 py-2">
            ADD A CREATOR
          </button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
