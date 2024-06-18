import React from "react";
import StarRatings from "react-star-ratings";
import showAverage from "../helper/ratingCalculate";

export default function ShowAverageRating({ item }) {
  const averageRating = showAverage(item);
  //   console.log(averageRating);

  return (
    <div>
      {averageRating ? (
        <StarRatings
          rating={averageRating}
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="#ffd700"
        />
      ) : (
        <span>No ratings yet</span>
      )}
    </div>
  );
}
