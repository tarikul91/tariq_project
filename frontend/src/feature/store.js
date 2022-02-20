import { configureStore } from "@reduxjs/toolkit";
import formReducer from "feature/allForm"
import todReducer from "feature/todoSlice"

const store = configureStore({
    reducer:{
        forms:formReducer,
        todos:todReducer
    }
})
export default store