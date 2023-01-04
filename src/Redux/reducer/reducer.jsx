
const initialState = {
    products: [],
    card: {
        products: [],
        total: 0,
        tax: 0,
        delivery: 120, 
    },
} 

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRODUCT":
        return {
            ...state,
            products: action.payload
        }
        case "ADD_ITEMS":
            return {
                ...state,
                card: {
                products: [...state.card.products, action.payload]
                }
            }
        default:
        return state;
    }
}