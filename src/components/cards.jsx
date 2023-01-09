import React from "react";
import { ADD_ITEMS } from "../Redux/reducer/constants";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Cards = ({ value }) => {
  const dispatch = useDispatch();
  const productData = (id, name, price, image, quantity) => {
    const dataArray = { id, name, price, image, quantity };
    dispatch({ type: ADD_ITEMS, payload: dataArray });
  };

//   const locationChange = () => {
    
//   }
//   onClick={locationChange()}

  return (
    <Link to={`/product/${value.id}`}>
    <div className="border flex flex-col items-center p-[10px] border-blue-400 mx-[10px] my-[10px]">
      <img className="w-[200px] h-[200px]" src={value.image} alt="" />
      <div className="text-center">
        <span>Name: {value.name}</span>
        <br />
        <span>Price: {value.price}</span>
      </div>
      <button
        className="border py-[10px] px-[25px] my-[10px] bg-blue-400"
        onClick={() => {
          productData(
            value.id,
            value.name,
            value.price,
            value.image,
            value.quantity
          );
        }}
      >
        Add To Cart
      </button>
    </div>
    </Link>
  );
};

export default Cards;
