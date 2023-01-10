import { comment } from "postcss";
import Image from "../../assets/download.jpeg";
import {
  ITEMS_TOTAL,
  ADD_ITEMS,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  DELETE_COMMENTS,
  DELIVERY_CHARGES,
  REPLY_DATA,
  COMMENTS_DATA,
  END_INCREMENT,
} from "./constants";

const initialState = {
  products: [
    {
      id: 1,
      image: Image,
      name: "pent",
      price: 300,
      quantity: 1,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!",
    },
    {
      id: 2,
      image: Image,
      name: "shirt",
      price: 200,
      quantity: 1,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!",
    },
    {
      id: 3,
      image: Image,
      name: "Tie",
      price: 500,
      quantity: 1,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!",
    },
    {
      id: 4,
      image: Image,
      name: "Inner",
      price: 700,
      quantity: 1,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!",
    },
    {
      id: 5,
      image: Image,
      name: "Boxer",
      price: 200,
      quantity: 1,
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!",
    },
  ],

  card: {
    products: [],
    total: 0,
    delivery: 120,
  },

  // productDetail: [
  //   {
  //     id: 1,
  //     comment: ["saad"],
  //     reply: ["iiii"]
  //   }
  // ]

  productDetail: [
    // {
    //   id: 1,
    //   comments: ["this is pent"],
    //   reply: ["saad"],
    //   ref: 1,
    // },
    // {
    //   id: 2,
    //   comments: ["this is shirt"],
    //   reply: ["bilal"],
    //   ref: 2,
    // },
    // {
    //   id: 3,
    //   comments: ["this is tie"],
    //   reply: ["wajahat"],
    //   ref: 3,
    // },
    // {
    //   id: 4,
    //   comments: ["this is inner"],
    //   reply: ["saad"],
    //   ref: 4,
    // },
    // {
    //   id: 5,
    //   comments: ["this is boxer"],
    //   reply: ["taha"],
    //   ref: 5,
    // },
  ],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS:
      const existingProducts = state.card.products.find(
        (items) => items.id === action.payload.id
      );
      if (existingProducts) {
        existingProducts.quantity++;
        existingProducts.price += action.payload.price;
        return {
          ...state,
          card: {
            products: [...state.card.products],
            existingProducts,
          },
        };
      } else {
        return {
          ...state,
          card: {
            products: [...state.card.products, action.payload],
          },
        };
      }
    case ITEMS_TOTAL:
      return {
        ...state,
        card: {
          ...state.card,
          total: action.payload,
        },
      };
    case DECREMENT_ITEM:
      const deleteProducts = state.card.products.find(
        (item) => item.id === action.payload.id
      );
      const decreaseProduct = state.products.find(
        (items) => items.id === action.payload.id
      );
      deleteProducts.quantity--;
      deleteProducts.price -= decreaseProduct.price;
      return {
        ...state,
        card: {
          products: [...state.card.products],
          deleteProducts,
        },
      };
    case INCREMENT_ITEM:
      const addProducts = state.card.products.find(
        (item) => item.id === action.payload.id
      );
      const increaseProduct = state.products.find(
        (items) => items.id === action.payload.id
      );
      addProducts.quantity++;
      addProducts.price += increaseProduct.price;
      return {
        ...state,
        card: {
          products: [...state.card.products],
          addProducts,
        },
      };
    case END_INCREMENT:
      return {
        ...state,
        card: {
          products: action.payload,
        },
      };
    case DELIVERY_CHARGES:
      return {
        ...state,
        card: {
          ...state.card,
          delivery: action.payload,
        },
      };
    case COMMENTS_DATA:
      console.log(action.payload)
      return {
        ...state,
        productDetail: action.payload
        
      };
    case DELETE_COMMENTS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case REPLY_DATA:
      return {
        ...state,
        productDetail: action.payload,
      };
    default:
      return state;
  }
};
