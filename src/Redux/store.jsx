import {createStore} from "redux"
import { productReducer } from "./reducer/reducer"
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "persist-key",
    storage
}

const persistedReducer = persistReducer(persistConfig, productReducer)
const store = createStore(persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
const persistor = persistStore(store)

export default store
export {persistor}


