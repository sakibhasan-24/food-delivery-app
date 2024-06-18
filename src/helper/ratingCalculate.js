import React from "react";
import StarRatings from "react-star-ratings";

export default function showAverage(item) {
  if (item && item.ratings && item.ratings.length > 0) {
    let ratingArray = item && item.ratings;
    let total = [];
    let length = ratingArray.length;
    ratingArray.map((singleItem) => total.push(singleItem.star));
    let totalRating = total.reduce((prev, next) => prev + next, 0);
    // console.log("totalRating", totalRating);
    let highest = length * 5;
    // console.log(highest);
    let result = (totalRating * 5) / highest;
    // console.log("result", result);

    return result;
  }
}
