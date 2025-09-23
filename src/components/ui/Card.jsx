import React from "react";

function Card({ imgSrc, title, description, link }) {
  return (
    <a
      href={link}
      className="flex flex-col items-center justify-center w-72 h-58 p-4 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-center"
    >
      <img src={imgSrc} alt={title} className="w-22 h-20 mb-2 object-contain" />
      <h5 className="text-lg font-semibold text-brand-teal-dark mb-2">
        {title}
      </h5>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </a>
  );
}

export default Card;
