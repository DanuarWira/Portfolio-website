import React from "react";

export default function Menu({ Text, Icon, IsActive }) {
  const iconWithClonedProps = React.cloneElement(Icon, {
    className: `transition-colors duration-200 ${IsActive ? "text-primary-700" : "text-gray-500 group-hover:text-gray-900"}`,
    size: 20,
  });
  return (
    <>
      <div className="flex gap-2 py-3 px-4">
        {iconWithClonedProps}
        <p className={`text-sm font-medium transition-colors duration-200 ${IsActive ? "text-primary-700" : "text-gray-700 group-hover:text-gray-900"}`}>{Text}</p>
      </div>
    </>
  );
}
