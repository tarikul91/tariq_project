import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReq } from "service/fetchReq";
export const fetchTodoForm = createAsyncThunk('todo/dynamic-form', async (id) => {
    const response = await getReq('/dynamic-form/get-by-id', id)
    return response
})
const initialState = {
    form: {
        _id: null,
        formDetail: null,
        all_attribute_details: []
    }
}
const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchTodoForm.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodoForm.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.form = action.payload.data[0]
            })
            .addCase(fetchTodoForm.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})
export default TodoSlice.reducer;
