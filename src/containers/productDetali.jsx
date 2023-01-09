import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ProductDetali = () => {
  const { productId } = useParams();
  const selectedProduct = useSelector((state) => state.products);
  const filterProduct = selectedProduct.find(
    (items) => items.id == productId
  );
  const { id, image, name, price, details } = filterProduct;


    const [listed, setListed] = useState([]);
  const inputText = useRef()
  const submit = () => {
    console.log(inputText.current.value)
    setListed([inputText.current.value])
  }


  return (
    <>
    <div className="flex justify-center mx-[50px] my-[50px]">
      <div className="border-[2px] p-[20px]">
        <img src={image} alt="" />
      </div>
      <div className="border-[2px] w-[600px] px-[20px] py-[50px]">
        <p className="text-[20px] font-semibold">Name : <span className="text-[20px] font-normal">{name}</span></p>
        <br />
        <p className="text-[20px] font-semibold">Price : <span className="text-[20px] font-normal">{price}</span></p>
        <br />
        <p className="text-[20px] font-semibold">Details : <span className="text-[20px] font-normal">{details}</span></p>
      </div>
    </div>

    <div className="flex flex-col justify-center items-center">
    <div className="flex justify-center items-center">
        <span className="font-bold">Comment :</span>
        <span className="text-[30px] font-bold ml-[20px] text-gray-500">This Product Is Amazing</span>
    </div>
    <div className="mt-[20px]">
        { 
            listed.map((items, index) => {
                return (
                    <p key={index}>{items}</p>
                )
            })
        }
    </div>

    <div className="mt-[20px]">
        <input className="border-[2px] border-black w-[300px] px-[10px] py-[5px]" type="text" placeholder="Reply" ref={inputText} />
        <button className="border-[2px] border-black font-bold px-[15px] py-[5px] ml-[10px]" onClick={() => submit()}>submit</button>
    </div>
    </div>
    </>
  );
};

export default ProductDetali;
