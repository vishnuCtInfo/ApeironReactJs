import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: []
}
export const hotMoversSlice = createSlice({
    name: 'hot_movers',
    initialState,
    reducers: {
        redux_setHotMoversCoins: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { redux_setHotMoversCoins} = hotMoversSlice.actions;

export default hotMoversSlice.reducer;