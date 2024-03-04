import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    address: null,
    peraAddress:null,
    deflyAddress:null,
    info: null,
    data: []
}
export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        redux_setWalletAddress: (state, action) => {
            state.address = action.payload;
        },
        redux_setPeraWalletAddress: (state, action) => {
            state.address = action.payload;
            state.peraAddress = action.payload;
        },
        redux_setDeflyWalletAddress: (state, action) => {
            state.address = action.payload;
            state.deflyAddress = action.payload;
        },
        redux_setWalletInformation: (state, action) => {
            state.info = action.payload;
        }
    }
})

export const {redux_setPeraWalletAddress, redux_setDeflyWalletAddress ,redux_setWalletAddress, redux_setWalletInformation } = walletSlice.actions;

export default walletSlice.reducer;