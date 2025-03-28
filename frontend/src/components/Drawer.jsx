import React from "react";
import { Link } from "react-router-dom";

const Drawer = ({ title = "App Title", menuItems = [] }) => {
  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-primary w-56 p-4 shadow-lg overflow-y-auto"
      style={{ zIndex: 1000 }} // Ensure drawer stays above other content
    >
      {/* App Title */}
      <div className="text-lg font-bold mb-4">{title}</div>
      {/* Menu Items */}
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`rounded-lg hover:bg-primary/20 transition-colors ${
              item.isActive ? "bg-primary/40 text-primary-content" : ""
            }`}
          >
            <Link to={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Drawer;
