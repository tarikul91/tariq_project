import { configureStore } from "@reduxjs/toolkit";
import formReducer from "feature/allForm"

const store = configureStore({
    reducer:{
        forms:formReducer,
    }
})
export default store