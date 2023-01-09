import Image from "../../assets/download.jpeg";
import {
  // GET_PRODUCT,
  ITEMS_TOTAL,
  ADD_ITEMS,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
} from "./constants";


const initialState = {
  products: [
    {
      id: 1,
      image: Image,
      name: "pent",
      price: 300,
      quantity: 1,
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!"
    },
    {
      id: 2,
      image: Image,
      name: "shirt",
      price: 200,
      quantity: 1,
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!"
    },
    {
      id: 3,
      image: Image,
      name: "Tie",
      price: 500,
      quantity: 1,
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!"
    },
    {
      id: 4,
      image: Image,
      name: "Inner",
      price: 700,
      quantity: 1,
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!"
    },
    {
      id: 5,
      image: Image,
      name: "Boxer",
      price: 200,
      quantity: 1,
      details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsum eligendi quibusdam nesciunt ullam ipsam obcaecati voluptates nobis, iusto eaque!"
    },
  ],

  card: {
    products: [],
    total: 0,
    delivery: 120,
  },

  productDetail: {
    comments: ["saad", "ahmed", "ali"],
    reply: ["ibaad", "bilal", "wajahat"]
  }
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
       case "DELIVERY_CHARGES":
      return {
        ...state,
        card: {
          ...state.card,
          delivery: action.payload,
        },
      };
    default:
      return state;
  }
};

