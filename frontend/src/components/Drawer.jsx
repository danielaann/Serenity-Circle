import React from "react";

const Drawer = ({ title = "App Title", menuItems = [] }) => {
  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-base-200 w-56 p-4 shadow-lg overflow-y-auto"
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
            <a href={item.link || "#"}>{item.name}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Drawer;
