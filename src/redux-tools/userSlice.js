import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    login: false,
    data: []
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        redux_setLogin: (state, action) => {
            state.login = action.payload;
        },
        redux_setUserLoginData: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { redux_setLogin, redux_setUserLoginData } = userSlice.actions;

export default userSlice.reducer;