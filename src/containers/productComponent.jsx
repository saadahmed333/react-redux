import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRODUCT,
  ADD_ITEMS,
  ITEMS_TOTAL,
  INCREMENT_ITEM,
  DECREMENT_ITEM
} from "../Redux/reducer/constants";

const ProductComponent = () => {
  const [tax, setTax] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [updatequantity, setUpdateQuantity] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.card.products);
  const total = useSelector((state) => state.card.total);

  const productData = (id, name, price, image, quantity) => {
    const dataArray = { id, name, price, image, quantity };
    dispatch({ type: ADD_ITEMS, payload: dataArray });
  };

  const quantity = [];
  let quantityTotal = 0;
  const itemTotal = () => {
    let subTotal = 0;
    cartProducts.map((item) => {
      subTotal += item.price;
      quantity.push(item.quantity);
    });
    quantity.map((v) => {
      quantityTotal += v;
    });
    setUpdateQuantity(quantityTotal);
    setTax(20 * cartProducts.length);
    setSubtotal(tax + total);
    dispatch({ type: ITEMS_TOTAL, payload: subTotal });
  };

  useEffect(() => {
    itemTotal();
  }, [productData]);


  const increment = (id, price, quantity) => {
    console.log(id)
    const deleteArray = { id, price, quantity };
    dispatch({type: INCREMENT_ITEM, payload: deleteArray})
  }
  const decrement = (id, price, quantity) => {
    console.log(id)
    const addArray = { id, price, quantity };
    dispatch({type: DECREMENT_ITEM, payload: addArray})
  }



  return (
    <>
      <div className="flex justify-end items-center mx-[50px] my-[10px] relative ">
        <img
          className="w-[60px] "
          src="https://png.pngtree.com/element_our/png/20181031/shopping-cart-png_224349.jpg"
          alt=""
        />
        <span className="font-bold bg-slate-300 w-[20px] rounded-xl flex justify-center absolute bottom-10 right-[-5px]">
          {updatequantity}
        </span>
      </div>
      <div className="px-[20px] pb-[20px] flex">
        <div className="flex flex-wrap justify-center w-[60%] border mr-[5px] overflow-scroll overflow-x-hidden h-[80vh]">
          {product.map((value) => {
            return (
              <div
                key={value.id}
                className="border flex flex-col items-center p-[10px] border-blue-400 mx-[10px] my-[10px]"
              >
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
            );
          })}
        </div>
        <div className="w-[40%] bg-slate-500 text-white h-[80vh] overflow-scroll overflow-x-hidden">
          <div>
            <h1 className="text-center mt-[20px] text-[30px] font-bold">
              CART
            </h1>
            <div className="mt-[20px] ml-[20px] font-bold h-[200px] flex flex-col justify-between">
              <p>
                ITEMS :
                <span className="ml-[50px] text-[20px] font-bold">
                  {updatequantity}
                </span>
              </p>
              <p>
                TOTAL :
                <span className="ml-[50px] text-[20px] font-bold">{total}</span>
              </p>
              <p>
                TAX :
                <span className="ml-[50px] text-[20px] font-bold">{tax}</span>
              </p>
              <p>
                SUB TOTAL :
                <span className="ml-[20px] text-[20px] font-bold">
                  {subTotal}
                </span>
              </p>
            </div>
            {cartProducts.map((value, index) => {
              return (
                <div
                  key={index}
                  className="mt-[50px] flex justify-around items-center"
                >
                  <img
                    className="h-[50px] w-[50px] rounded-[50%]"
                    src={value.image}
                    alt=""
                  />
                  <div className="text-center">
                    <p>Name</p>
                    <span>{value.name}</span>
                  </div>
                  <div className="text-center">
                    <p>Quantity</p>
                    <button onClick={() => increment(value.id, value.price, value.quantity)} className="bg-white text-black w-[20px] font-bold mr-[10px]">+</button>
                    <span>{value.quantity}</span>
                    <button onClick={() => decrement(value.id, value.price, value.quantity)} className="bg-white text-black w-[20px] font-bold ml-[10px]">-</button>
                  </div>
                  <div className="text-center">
                    <p>Price</p>
                    <span>{value.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;

// const fetchData = async () => {
//   const response = await axios.get("https://fakestoreapi.com/products");
//   dispatch({ type: GET_PRODUCT, payload: response.data });
// };

// useEffect(() => {
//   fetchData();
// }, []);
