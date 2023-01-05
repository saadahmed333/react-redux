import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRODUCT } from '../Redux/reducer/constants'
import { ADD_ITEMS } from '../Redux/reducer/constants'
import { ITEMS_TOTAL } from '../Redux/reducer/constants'

const ProductComponent = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products)
  const cartProducts = useSelector((state) => state.card.products)
  const tax = useSelector((state) => state.card.tax)
  const total = useSelector((state) => state.card.total)
  
  
  const fetchData = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    dispatch({ type: GET_PRODUCT, payload: response.data })
  }

  const productData = (id, title, price) => {
    const dataArray = { id, title, price }
    dispatch({ type: ADD_ITEMS, payload: dataArray })
  }

  const itemTotal = () => {
    let subTotal = 0
    cartProducts.map((item) => {
      subTotal += item.price
    })
    dispatch({ type: ITEMS_TOTAL, payload: subTotal })
  }

  useEffect(() => {
    itemTotal()
  }, [productData])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="flex justify-end items-center mx-[50px] my-[10px] relative ">
        <img
          className="w-[60px] "
          src="https://png.pngtree.com/element_our/png/20181031/shopping-cart-png_224349.jpg"
          alt=""
        />
        <span className="font-bold bg-slate-300 w-[20px] rounded-xl flex justify-center absolute bottom-10 right-[-5px]">
        {cartProducts.length}
        </span>
      </div>
      <div className="p-[20px] flex">
        <div className="flex flex-wrap justify-center w-[80%]">
          {product.map((value) => {
            return (
              <div
                key={value.id}
                className="border flex flex-col items-center p-[10px] border-blue-400 mx-[10px] my-[10px]"
              >
                <img className="w-[200px] h-[200px]" src={value.image} alt="" />
                <div className="text-center">
                  <span>Title: {value.title.split(' ')[2]}</span>
                  <br />
                  <span>Price: {value.price}</span>
                </div>
                <button
                  className="border py-[10px] px-[25px] my-[10px] bg-blue-400"
                  onClick={() => {
                    productData(
                      value.id,
                      value.title.split(' ')[2],
                      value.price,
                    )
                    // itemTotal()
                  }}
                >
                  Add To Cart
                </button>
              </div>
            )
          })}
        </div>
        <div className="w-[20%] bg-slate-500 text-white">
          <div>
            <h1 className="text-center mt-[20px] text-[30px] font-bold">
              CART
            </h1>
            <div className="mt-[20px] ml-[20px] font-bold h-[200px] flex flex-col justify-between">
              <p>
                ITEMS :
                <span className="ml-[50px] text-[20px] font-bold">
                  {cartProducts.length}
                </span>
              </p>
              <p>
                TAX :
                <span className="ml-[50px] text-[20px] font-bold">{tax}</span>
              </p>
              {/* <p>
                DELIVERY :
                <span className="ml-[20px] text-[20px] font-bold">
                  {delivery}
                </span>
              </p> */}
              <p>
                TOTAL :
                <span className="ml-[50px] text-[20px] font-bold">{total}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductComponent
