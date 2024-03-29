import { type } from "@testing-library/user-event/dist/type";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { REPLY_DATA } from "../Redux/reducer/constants";
import ReactStars from "react-stars";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const selectedProduct = useSelector((state) => state.products);
  const filterProduct = selectedProduct.find((items) => items.id == productId);
  const comments = useSelector((state) => state.productDetail);
  const { id, image, name, price, details } = filterProduct;
  const [change, setChange] = useState(false);
  const [commentState, setCommentState] = useState([]);
  const [starRating, setStarRating] = useState();

  const productRating = [];
  let productStarRating = 0;
  const fetchId = () => {
    const rating = comments.filter((item) => item.id === id)
    setCommentState(rating);
    for (let i = 0; i < rating.length; i++) {
      productRating.push(rating[i].star)
      productStarRating += rating[i].star
    }
    setStarRating(productStarRating / productRating.length)
  };

  useEffect(() => {
    fetchId();
  }, [change]);

  let star = 0;
  const ratingChanged = (newRating) => {
    star = newRating;
  };

  const inputText = useRef();
  const commentData = () => {
    let num = Math.random();
    let myComments = [...comments];
    myComments.push({
      id: id,
      comments: [inputText.current.value],
      reply: [],
      ref: num,
      star: star,
    });
    dispatch({ type: "COMMENTS_DATA", payload: myComments });
    setChange(!change);
    inputText.current.value = "";
  };

  const deleteComment = (index) => {
    console.log(index);
    let myComments = [...comments];
    for (let i = 0; i < myComments.length; i++) {
      if (id == myComments[i].id) {
        myComments.splice(i, 1);
        dispatch({ type: "DELETE_COMMENTS", payload: myComments });
      }
    }
    setChange(!change);
  };

  const [accord, setAccord] = useState();
  const replyBtnOn = (ids, items) => {
    setAccord(ids);
  };

  const replyText = useRef();
  const replyData = (ref, id) => {
    let myComments = [...comments];
    for (let i = 0; i < myComments.length; i++) {
      if (id == myComments[i].id && ref === myComments[i].ref) {
        myComments[i].reply.push(replyText.current.value);
        dispatch({ type: REPLY_DATA, payload: myComments });
      }
    }
    replyText.current.value = "";
  };

  return (
    <>
      <div className="flex justify-center mx-[50px] my-[50px]">
        <div className="border-[2px] p-[20px]">
          <img src={image} alt="" />
        </div>
        <div className="border-[2px] w-[600px] px-[20px] py-[50px]">
          <div className="flex justify-end items-center">
            <span className="mr-[10px]">Rating :</span>
            <ReactStars 
                    edit={true}
                    count={5}
                    value={starRating}
                    size={24}
                    color2={"#ffd700"} />
          </div>
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
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2={"#ffd700"}
          />
          <input
            className="border-[2px] w-[500px] px-[10px] py-[5px]"
            type="text"
            placeholder="Reply"
            ref={inputText}
          />
          <button
            className="border-[2px] font-bold px-[15px] py-[5px] ml-[10px]"
            onClick={() => commentData()}
          >
            submit
          </button>
        </div>
      </div>

      <div className="flex justify-center my-[20px]">
        <div className="w-[50%]">
          {commentState.map((items, index) => {
            return (
              <div
                key={index}
                className="pb-[20px] border-b-2 rounded-3xl border mb-[10px]"
              >
                <div className="flex justify-between my-[10px] mx-[10px]">
                  <ReactStars
                    edit={true}
                    count={5}
                    value={items.star}
                    size={24}
                    color2={"#ffd700"}
                  />
                  <button
                    className="bg-blue-400 text-white px-[20px] py-[5px] rounded-2xl"
                    onClick={() => deleteComment(index)}
                  >
                    Delete
                  </button>
                </div>
                <p className="text-[30px] ml-[20px] text-black border rounded-3xl pl-[20px] bg-slate-300 w-[500px]">
                  {items.comments}
                </p>
                <button
                  className="ml-[30px] text-blue-500"
                  onClick={() => replyBtnOn(index, items)}
                >
                  reply
                </button>
                <span className="ml-[20px]">.</span>
                <button className="ml-[20px] text-blue-500">share</button>

                <div className="ml-[200px] mt-[20px] flex flex-col gap-3">
                  {items.reply.map((itemss, index) => {
                    return (
                      <span
                        key={index}
                        className="border bg-slate-100 px-[20px] py-[5px] rounded-2xl"
                      >
                        {itemss}
                      </span>
                    );
                  })}
                  {accord == index && (
                    <div className="flex justify-center mt-[30px]">
                      <input
                        className="border-blue-400 border-[2px] h-[40px] w-[500px] pl-[10px] outline-none"
                        type="text"
                        placeholder="Reply"
                        ref={replyText}
                      />
                      <button
                        onClick={() => replyData(items.ref, items.id)}
                        className="border-blue-400 border-[2px] px-[20px] ml-[5px]"
                      >
                        send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
