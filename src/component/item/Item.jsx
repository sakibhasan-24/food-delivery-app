import React from "react";

export default function Item({ item }) {
  return (
    <div className="border-2 border-gray-200 p-4 rounded-md shadow-xl shadow-slate-600 m-2 flex flex-col justify-center items-center">
      <div className="w-full rounded-md ">
        <img
          src={item.image[0]}
          alt="images"
          className="w-full object-cover rounded-lg"
        />
      </div>
      <div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm text-gray-50 text-center font-bold">
            {item.name}
          </p>
          <p className="text-sm text-gray-50 text-center font-semibold">
            {item.category}
          </p>
          <p>
            {item.isOffer && (
              <p>
                <span className="text-red-500 text-sm font-semibold">
                  {item.offer}%
                </span>
                <br />
              </p>
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-50 text-center">
            ingredient
            <br />
            {item.ingredients.map((ingredient, index) => (
              <p key={index} className="flex justify-center items-center">
                <span>
                  {index + 1}:{ingredient}
                </span>
              </p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
