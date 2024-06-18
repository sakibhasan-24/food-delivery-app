import React, { useEffect, useState } from "react";
import useGetItems from "../../hooks/useGetItems";
import Spinner from "../../component/spinner/Spinner";
import Item from "../../component/item/Item";

import { Checkbox, Menu, Slider, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaDollarSign } from "react-icons/fa";
import { clearSearchText } from "../../redux/searchReducer/searchReducer";
import Star from "../../component/StarRating/Star";

const categoriesItemsForSearch = [
  "appetizer",
  "main-course",
  "dessert",
  "soup",
  "salad",
  "side-dish",
  "couple-package",
  "family-package",
  "student-package",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "drink",
  "spice",
];

const { SubMenu, ItemGroup } = Menu;
export default function SearchItems() {
  const { getItems, fetchItemsByFilterAndSearch } = useGetItems();
  const dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { searchText } = useSelector((state) => state.search);
  // const { searchText } = search;
  const [initialItems, setInitialItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState([0, 0]);
  const [star, setStar] = useState("");
  const [readyToFetch, setReadyToFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (category) => {
    dispatch(clearSearchText(""));
    setPrice([0, 0]);
    if (selectedCategory === category) {
      // If the same category is clicked again, deselect it
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  const showCateories = () =>
    categoriesItemsForSearch.map((category, idx) => (
      <div className="ml-2 px-4 py-1 font-semibold" key={idx}>
        <Checkbox
          onChange={() => handleCategoryChange(category)}
          checked={selectedCategory === category}
          value={category}
        >
          {category}
        </Checkbox>
      </div>
    ));
  // console.log(showCateories());
  // Fetch items on component mount
  useEffect(() => {
    setLoading(true);
    const getAllItems = async () => {
      console.log("hey i am rendering");
      const res = await getItems();

      console.log("res loading", loading);
      setInitialItems(res.items);
      setLoading(false);
    };
    if (
      searchText === "" &&
      selectedCategory === null &&
      price[0] === 0 &&
      price[1] === 0 &&
      star === ""
    )
      getAllItems();
  }, []);

  // Fetch items based on search text
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setStar("");
      setSelectedCategory(null);
      setPrice([0, 0]);
      fetchItems({ query: searchText });
    }, 400);
    return () => clearTimeout(delayedSearch);
  }, [searchText]);

  //   fetch items based on price

  useEffect(() => {
    fetchItems({ price: price });
  }, [readyToFetch]);

  //   fetch items based on category
  useEffect(() => {
    fetchItems({ category: selectedCategory });
  }, [selectedCategory]);
  //   common function
  const fetchItems = async (arg) => {
    try {
      const items = await fetchItemsByFilterAndSearch(arg);
      console.log("items", items);
      setInitialItems(items.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSlider = (value) => {
    dispatch(clearSearchText(""));
    setSelectedCategory(null);
    setStar("");
    setPrice(value);

    setTimeout(() => {
      setReadyToFetch(!readyToFetch);
    }, 400);
  };

  const handleStarClick = (number) => {
    console.log(number);
    dispatch(clearSearchText(""));
    setSelectedCategory(null);
    setPrice([0, 0]);
    setStar(number);
    fetchItems({ star: number });
  };

  const showStars = () => (
    <div className="px-2 py-1">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Search/Filter Section */}
        <div className="sm:col-span-1  rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            Search / Filter
          </h2>
          <Menu mode="inline" defaultOpenKeys={["1", "2"]}>
            <SubMenu
              key={"1"}
              title={
                <span className="font-bold text-xl text-blue-600 -ml-0">
                  $price
                </span>
              }
            >
              <div>
                <Slider
                  className="mx-4"
                  tooltip={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={1000}
                ></Slider>
              </div>
            </SubMenu>
            <SubMenu
              key={"2"}
              title={
                <span className="font-bold text-xl text-blue-600 -ml-0">
                  Category
                </span>
              }
            >
              <div>{showCateories()}</div>
            </SubMenu>

            {/* ratings */}
            <SubMenu
              key={"3"}
              title={
                <span className="font-bold text-xl text-blue-600 -ml-0">
                  Ratings
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>
          </Menu>
          {/* Add your search/filter components here */}
          <div className="border-t border-gray-200 pt-4">
            {/* Add your search/filter components here */}
          </div>
        </div>

        {/* Items Section */}
        <div className="sm:col-span-2  rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
          {/* Loading Spinner or Items */}
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : initialItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {/* Render items */}
              {initialItems.map((item) => (
                <Item item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}
