import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coinSlice";
import userSlice from "./userSlice";
import walletSlice from "./walletSlice";
import apportunitiesSlice from "./apportunitySlice";
import hotMoversSlice from "./hotMoversSlice";


const store = configureStore({
    reducer:{
        coins : coinSlice,
        user : userSlice,
        wallet : walletSlice,
        apportunities : apportunitiesSlice,
        hot_movers : hotMoversSlice
    }
}) 

export default store;