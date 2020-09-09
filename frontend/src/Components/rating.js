import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Rating(props) {
  return (
    <div className="rating">
      <span>
        {props.rating >= 1 ? (
          <BsStarFill className="fa-star" />
        ) : props.rating >= 0.5 ? (
          <BsStarHalf className="fa-star-half" />
        ) : (
          <BsStar className="fa-star-o" />
        )}
      </span>
      <span>
        {props.rating >= 2 ? (
          <BsStarFill className="fa-star" />
        ) : props.rating >= 1.5 ? (
          <BsStarHalf className="fa-star-half" />
        ) : (
          <BsStar className="fa-star-o" />
        )}
      </span>
      <span>
        {props.rating >= 3 ? (
          <BsStarFill className="fa-star" />
        ) : props.rating >= 2.5 ? (
          <BsStarHalf className="fa-star-half" />
        ) : (
          <BsStar className="fa-star-o" />
        )}
      </span>
      <span>
        {props.rating >= 4 ? (
          <BsStarFill className="fa-star" />
        ) : props.rating >= 3.5 ? (
          <BsStarHalf className="fa-star-half" />
        ) : (
          <BsStar className="fa-star-o" />
        )}
      </span>
      <span>
        {props.rating >= 5 ? (
          <BsStarFill className="fa-star" />
        ) : props.rating >= 4.5 ? (
          <BsStarHalf className="fa-star-half" />
        ) : (
          <BsStar className="fa-star-o" />
        )}
      </span>
    </div>
  );
}

export default Rating;
