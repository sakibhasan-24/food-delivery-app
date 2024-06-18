import React from "react";
import Items from "../items/Items";
import CategoryList from "../../component/CategoryList";

export default function Home() {
  return (
    <div>
      <Items />

      <CategoryList />
    </div>
  );
}
