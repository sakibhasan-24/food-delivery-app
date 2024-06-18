import { Option } from "antd/es/mentions";
import { Select } from "flowbite-react";
import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";

const gift = [
  "Chocolate",
  "salads",
  "4 slice cheese",
  "water",
  "candy",
  "cake",
];
export default function ProductKeyTable({ item }) {
  //   console.log(item);
  const dispatch = useDispatch();
  const imageUrl = item.image[0];
  //   console.log(imageUrl);
  const handleGiftChange = (e) => {
    let itemCart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("itemCart")) {
        itemCart = JSON.parse(localStorage.getItem("itemCart"));
      }
      itemCart.map((singleItem, idx) => {
        if (singleItem._id === item._id) {
          itemCart[idx].gift = e.target.value;
        }
      });
      localStorage.setItem("itemCart", JSON.stringify(itemCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: itemCart,
      });
    }
  };
  const handleNumberOfItem = (e) => {
    let itemCart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("itemCart")) {
        itemCart = JSON.parse(localStorage.getItem("itemCart"));
      }
      itemCart.map((singleItem, idx) => {
        if (singleItem._id === item._id) {
          itemCart[idx].numberOfItem = e.target.value;
        }
      });
      localStorage.setItem("itemCart", JSON.stringify(itemCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: itemCart,
      });
    }
  };

  const handleRemove = () => {
    let itemCart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("itemCart")) {
        itemCart = JSON.parse(localStorage.getItem("itemCart"));
      }
      itemCart.map((singleItem, idx) => {
        if (singleItem._id === item._id) {
          itemCart.splice(idx, 1);
        }
      });
      localStorage.setItem("itemCart", JSON.stringify(itemCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: itemCart,
      });
    }
  };
  return (
    <tbody>
      <tr className="text-center p-4 border-b border-gray-200">
        <td>{item?.name}</td>
        <td>
          <div>
            {item?.image?.length ? (
              <ModalImage
                small={imageUrl}
                large={imageUrl}
                className="h-12 w-12 mx-auto rounded-full"
              />
            ) : (
              "no image"
            )}
          </div>
        </td>
        <td>{item?.price}</td>
        <td>{item?.category}</td>
        <td>
          <select
            onChange={handleGiftChange}
            name="gift"
            className="block text-black px-4 py-2 mt-1 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {!item.gift && <option className="text-gray-600">Select</option>}
            {item?.gift && (
              <option className="text-gray-600" value={item.gift}>
                {item.gift}
              </option>
            )}
            {gift
              .filter((gift) => gift !== item.gift)
              .map((giftItem) => (
                <option
                  key={giftItem}
                  value={giftItem}
                  className="text-gray-800"
                >
                  {giftItem}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            name="numberOfItem"
            value={item.numberOfItem}
            onChange={handleNumberOfItem}
            className="text-black text-center p-2 w-16 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            min={1}
          />
        </td>

        <td onClick={handleRemove} className="cursor-pointer">
          ❌
        </td>
      </tr>
    </tbody>
  );
}
