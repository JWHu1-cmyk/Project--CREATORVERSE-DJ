


import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CreatorListItem({ item }) {
  return (
    <li key={item.id} className="list-group-item">
      <NavLink
        to={`./creators/${item.id}`}
        className={({ isActive, isPending }) =>
          isActive ? "list-group-item active" : isPending ? "list-group-item pending" : "list-group-item"
        }
      >
        <div>
          <strong>Name:</strong> {item.name ? item.name : "No Name"}
        </div>
        <div>
          <strong>URL:</strong> {item.url ? item.url : "No URL"}
        </div>
        <div>
          <strong>Description:</strong> {item.description ? item.description : "No Description"}
        </div>
 
      </NavLink>
    </li>
  );
}