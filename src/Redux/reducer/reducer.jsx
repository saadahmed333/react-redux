import { GET_PRODUCT } from "./constants"
import { ADD_ITEMS } from "./constants"
import { ITEMS_TOTAL } from "./constants"
const initialState = {
  products: [],
  card: {
    products: [],
    total: 0,
    tax: 0,
    delivery: 0,
  },
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      }
    case ADD_ITEMS:
      return {
        ...state,
        card: {
          products: [...state.card.products, action.payload],
        },
      }
    case ITEMS_TOTAL:
      return {
        ...state,
        card: {
          ...state.card,
          delivery: 120,
          total: action.payload,
        },
      }
    default:
      return state
  }
}
