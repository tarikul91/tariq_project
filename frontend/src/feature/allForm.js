import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReq } from "service/fetchReq";
export const fetchForm = createAsyncThunk('forms/all', async () => {
    const response = await getReq('/dynamic-form/get-all')
    return response
})
const initialState = {
    form: [
        {
            _id: null,
            formDetail: {
                formName:'',
                className:'',
                style:'',
            },
            all_attribute_details: [{
                type:"",
                name:""
            }]
        }
    ],
    status: 'idle',
    error: null,
}
const FormSlice = createSlice({
    name: 'forms',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchForm.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchForm.fulfilled, (state, action) => {
                state.status = 'idle'
                state.form = action.payload.data
            })
            .addCase(fetchForm.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})
export default FormSlice.reducer;
