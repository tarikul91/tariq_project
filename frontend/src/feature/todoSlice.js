import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReq } from "service/fetchReq";
export const fetchTodo= createAsyncThunk('todo/getall', async () => {
    const response = await getReq('/todo/all')
    return response
})
const initialState = {
    todos: [{
        _id: null,
        userName: '',
        title: '',
        description:''
    }],
    status: 'idle',
    error: null,
}
const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchTodo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.status = 'idle'
                state.todos = action.payload.data
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})
export default TodoSlice.reducer;
