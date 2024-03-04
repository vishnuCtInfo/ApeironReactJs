import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: []
}
export const coinSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        redux_setCoinsData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { redux_setCoinsData } = coinSlice.actions;

export default coinSlice.reducer;