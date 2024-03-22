import React, { useEffect, useState } from "react";

const ingredientsItem = [
  "appetizer",
  "main-course",
  "dessert",
  "beverage",
  "soup",
  "salad",
  "side-dish",
  "bread",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "beverage",
  "sauce",
  "drink",
  "condiment",
  "spice",
  "herb",
  "soup",
  "sauce",
];
// console.log(ingredientsItem);
export default function AddMenu() {
  const [formData, setFormData] = useState({
    name: "",
    offer: "no",
  });
  const [isOffer, setIsOffer] = useState(false);

  useEffect(() => {
    setIsOffer(formData.offer === "yes" ? true : false);
  }, [formData?.offer]);
  //   console.log(isOffer);
  return (
    <div className="w-full   mx-auto rounded-md  bg-slate-800">
      <h1 className=" font-semibold text-center text-4xl ">
        Add <span className="text-amber-600 font-bold font-serif">Items</span>
      </h1>
      <div>
        <div>
          <form className="w-full  p-6 my-10  mx-auto">
            <div
              className={`flex flex-row gap-2 ${isOffer && "justify-evenly"}`}
            >
              <div
                className={`w-full 
                  ${isOffer ? "w-full " : "sm:w-2/3"}
                 mb-4 flex flex-col gap-2`}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-200 text-md font-semibold"
                >
                  item Name
                </label>
                <input
                  placeholder="item name"
                  type="text"
                  className="w-full  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2"
                />
              </div>
              <div
                className={`w-full 
                  ${
                    isOffer ? "w-full " : "sm:w-3/4"
                  }  mb-4 flex flex-col gap-2`}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-200 text-md font-semibold"
                >
                  offer
                </label>
                <select
                  id="offer"
                  name="offer"
                  value={formData.offer}
                  onChange={(e) =>
                    setFormData({ ...formData, offer: e.target.value })
                  }
                  className={`${
                    isOffer ? "w-full " : "sm:w-1/4"
                  }  text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2`}
                >
                  <option disabled value="select offer">
                    select offer
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {isOffer && (
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full sm:w-2/5 flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="block text-gray-200 text-md font-semibold"
                    >
                      offer Price
                    </label>
                  </div>
                  <div>
                    <select className="w-full   text-orange-800 bg-slate-50 focus:border-0 rounded-lg px-2 py-2  border-gray-200 border-2">
                      <option value="select offer">select offer</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/*  */}
          </form>
        </div>
      </div>
    </div>
  );
}
