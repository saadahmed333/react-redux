import {createStore} from "redux"
import { productReducer } from "./reducer/reducer"

const store = createStore(productReducer);

export default store