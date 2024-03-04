import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Tokens from "./Pages/Tokens";
import Home from "./Pages/Home";
import Forgot_Password from "./Pages/Forgot_Password";
import Graph from "./Pages/Graph";
import Blogs from "./Pages/Blogs";
import ArbitrageApportunities from "./Pages/ArbitrageApportunities";
import HotCoins from "./Pages/HotCoins";
import PoolsData from "./Pages/PoolsData";
import Transaction from "./Pages/Transaction";
import PendingTransaction from "./Pages/PendingTransaction";
import AccountInfo from "./Pages/AccountInfo";
import HotMovers2 from "./Pages/HotMovers2";
import Dex_CexArbitrageApportunities from "./Pages/Dex_CexArbitrageApportunities";
import Bot from "./Pages/Bot";
import AllTransaction from "./Pages/AllTransaction";
import Dashboard from "./Pages/DashboardUser";
import { Provider } from "react-redux";
import store from "./redux-tools/store";
import Middelware from "./Components/Middelware";
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router basename="/">
          <Middelware>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/tokens" element={<Tokens />} />
              <Route
                exact
                path="/forgot/password"
                element={<Forgot_Password />}
              />
              <Route exact path="/graph" element={<Graph />} />
              <Route exact path="/blog" element={<Blogs />} />
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/arbitrage/oppotunities"
                element={<ArbitrageApportunities />}
              />
              <Route exact path="/hot/movers" element={<HotCoins />} />
              <Route exact path="/pools" element={<PoolsData />} />
              <Route exact path="/transaction" element={<Transaction />} />
              <Route
                exact
                path="/pending_transaction"
                element={<PendingTransaction />}
              />
              <Route exact path="/account_info" element={<AccountInfo />} />
              <Route exact path="/hot_mover" element={<HotMovers2 />} />
              <Route exact path="/bot" element={<Bot />} />
              <Route
                exact
                path="/dex_cex/arbitrage/oppotunities"
                element={<Dex_CexArbitrageApportunities />}
              />
              <Route
                exact
                path="/all-transaction"
                element={<AllTransaction />}
              />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Middelware>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
