import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ProductDetali = () => {
  const { productId } = useParams();
  const selectedProduct = useSelector((state) => state.products);
  const filterProduct = selectedProduct.find((items) => items.id == productId);
  const { id, image, name, price, details } = filterProduct;

  const comments = useSelector((state) => state.productDetail);
    const commentData = () => {
        console.log(comments)
    }
    
    // useEffect(() => {
    // }, []);
    
    
    const inputText = useRef();
    const submit = () => {
      commentData()
    console.log(inputText.current.value);
  };

  return (
    <>
      <div className="flex justify-center mx-[50px] my-[50px]">
        <div className="border-[2px] p-[20px]">
          <img src={image} alt="" />
        </div>
        <div className="border-[2px] w-[600px] px-[20px] py-[50px]">
          <p className="text-[20px] font-semibold">
            Name : <span className="text-[20px] font-normal">{name}</span>
          </p>
          <br />
          <p className="text-[20px] font-semibold">
            Price : <span className="text-[20px] font-normal">{price}</span>
          </p>
          <br />
          <p className="text-[20px] font-semibold">
            Details : <span className="text-[20px] font-normal">{details}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="mt-[20px]">
          <input
            className="border-[2px] w-[500px] px-[10px] py-[5px]"
            type="text"
            placeholder="Reply"
            ref={inputText}
          />
          <button
            className="border-[2px] font-bold px-[15px] py-[5px] ml-[10px]"
            onClick={() => submit()}
          >
            submit
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-[20px]">
        <div className="border w-[50%] h-[500px] pt-[20px]">
          <p className="text-[30px] ml-[20px] text-black border rounded-2xl pl-[20px] bg-slate-300 w-[500px]">This Product Is Amazing</p>
          <button className="ml-[30px] text-blue-500">reply</button>
          <span className="ml-[20px]">.</span>
          <button className="ml-[20px] text-blue-500">share</button>

        <div className="ml-[200px] mt-[20px] flex flex-col gap-3">
            <span className="border bg-slate-100 px-[20px] py-[5px] rounded-2xl">saad</span>
            <span className="border bg-slate-100 px-[20px] py-[5px] rounded-2xl">Lorem ipsum dolor sit amet.</span>
            <span className="border bg-slate-100 px-[20px] py-[5px] rounded-2xl">saad</span>
        </div>
          <div className="flex justify-center mt-[30px]">
            <input className="border-blue-400 border-[2px] h-[40px] w-[500px] pl-[10px] outline-none" type="text" placeholder="Reply" />
            <button className="border-blue-400 border-[2px] px-[20px] ml-[5px]">send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetali;
