import React from "react";
import StarRatings from "react-star-ratings";

export default function Star({ starClick, numberOfStars }) {
  return (
    <>
      <StarRatings
        changeRating={() => starClick(numberOfStars)}
        rating={numberOfStars}
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="white"
        starDimension="20px"
      />
      <br />
    </>
  );
}
