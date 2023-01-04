import axios from "axios";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
const ProductComponent = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products)
  const card = useSelector((state) => state.card.products)
  const delivery = useSelector((state) => state.card.delivery)
  // console.log(product)
  console.log(card)
  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products")
    // console.log(response.data);
    dispatch({type: "GET_PRODUCT", payload: response.data})
  }

  const productData = (id,category,price) => {
    const dataArray = [id,category,price]
    dispatch({type: "ADD_ITEMS", payload: dataArray})
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
    <div className="flex justify-end items-center mx-[50px] my-[10px] relative ">
      <img className="w-[60px] " src="https://png.pngtree.com/element_our/png/20181031/shopping-cart-png_224349.jpg" alt="" />
      <span className="font-bold bg-slate-300 w-[20px] rounded-xl flex justify-center absolute bottom-10 right-[-5px]">1</span>
    </div>
    <div className="p-[20px] flex">
      <div className="flex flex-wrap justify-center w-[80%]">
        { 
        product.map((value) => {
          return (
            <div key={value.id} className="border flex flex-col items-center p-[10px] border-blue-400 mx-[10px] my-[10px]">
              <img 
              className="w-[200px] h-[200px]"
                src={value.image}
                alt=""
              />
              <div className="text-center">
                <span>Category: {value.category}</span>
                <br />
                <span>Price: {value.price}</span>
              </div>
              <button className="border py-[10px] px-[25px] my-[10px] bg-blue-400" onClick={() => productData(value.id,value.category,value.price)}>
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-[20%] bg-slate-500 text-white">
        <div>
          <h1 className="text-center mt-[20px] text-[30px] font-bold">CART</h1>
          <div className="mt-[20px] ml-[20px] font-bold h-[200px] flex flex-col justify-between">
            <p>ITEMS : <span className="ml-[50px] text-[20px] font-bold">{card.length}</span></p>
            <p>TAX : </p>
            <p>DELIVERY : <span className="ml-[20px] text-[20px] font-bold">{delivery}</span></p>
            <p>TOTAL : </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductComponent;
