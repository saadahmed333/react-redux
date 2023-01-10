import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ITEMS_TOTAL,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  END_INCREMENT,
  DELIVERY_CHARGES
} from "../Redux/reducer/constants";
import Cards from "../components/cards";
const ProductComponent = () => {
  const [updatequantity, setUpdateQuantity] = useState(0);
  const [subTotals, setSubtotals] = useState(0);
  const [deliver, setDeliver] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.card.products);
  const total = useSelector((state) => state.card.total);
  const delivery = useSelector((state) => state.card.delivery);
  const productsTax = () => {
    let formula = 0;
    let delii = 0;
    let num = 0;
    if (updatequantity > 3) {
      formula = updatequantity / 3 + 1;
      delii = Math.floor(formula) * 1;
      num = delii * 120;
      setDeliver(num);
      dispatch({ type: DELIVERY_CHARGES, payload: deliver });
    }
    else {
      dispatch({ type: DELIVERY_CHARGES, payload: 120 });
    }
  };

  const quantity = [];
  let quantityTotal = 0;
  const itemTotal = () => {
    let itemsTotal = 0;
    cartProducts.map((item) => {
      itemsTotal += item.price;
      quantity.push(item.quantity);
    });
    quantity.map((v) => (quantityTotal += v));
    setUpdateQuantity(quantityTotal);
    setSubtotals(itemsTotal);
    dispatch({ type: ITEMS_TOTAL, payload: subTotals });
  };
  
  useEffect(() => {
    productsTax()
    itemTotal();
  });

  const increment = (id, price, quantity) => {
    const addArray = { id, price, quantity };
    dispatch({ type: INCREMENT_ITEM, payload: addArray });
  };


  const decrement = (id, price, quantity, index) => {
    const addProducts = [...cartProducts]
    for (let i = 0; i < addProducts.length; i++) {
      const deleteArray = { id, price, quantity };
      if (quantity == 1) {
            addProducts.splice(index, 1);
            dispatch({ type: END_INCREMENT, payload: addProducts });
        }
        else {
          dispatch({ type: DECREMENT_ITEM, payload:  deleteArray});
        }
    }
  };
  


  const tax = total / 100 * 15;
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
          {product.map((value, index) => {
            return <Cards key={index} value={value} />;
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
              SUB TOTAL :
                <span className="ml-[50px] text-[20px] font-bold">{total}</span>
              </p>
              <p>
                TAX :
                <span className="ml-[50px] text-[20px] font-bold">{`15%`}</span>
              </p>
              <p>
                Delivery :
                <span className="ml-[50px] text-[20px] font-bold">
                  {delivery ? delivery : 120}
                </span>
              </p>
              <p>
              TOTAL :
                <span className="ml-[20px] text-[20px] font-bold">
                  { updatequantity > 3 ? total + delivery + tax  : total + delivery + tax }
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
                    <button
                      onClick={() =>
                        decrement(value.id, value.price, value.quantity, index)
                      }
                      className="bg-white text-black w-[20px] font-bold mr-[10px]"
                    >
                      -
                    </button>
                    <span>{value.quantity}</span>
                    <button
                      onClick={() =>
                        increment(value.id, value.price, value.quantity)
                      }
                      className="bg-white text-black w-[20px] font-bold ml-[10px]"
                    >
                      +
                    </button>
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
