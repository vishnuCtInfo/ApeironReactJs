import React, { useEffect } from "react";
import {
  API_arbigtrage_apportunies,
  API_coins_data,
  API_hot_movers_coins,
  API_wallet_account_info,
} from "../Services/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { redux_setCoinsData } from "../redux-tools/coinSlice";
import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import {
  redux_setDeflyWalletAddress,
  redux_setPeraWalletAddress,
  redux_setWalletInformation,
} from "../redux-tools/walletSlice";
import { useNavigate } from "react-router-dom";
import {
  redux_setApportunities,
  redux_setApportunitiesMethod,
} from "../redux-tools/apportunitySlice";
import { redux_setHotMoversCoins } from "../redux-tools/hotMoversSlice";

function Middelware({ children }) {
  const deflyWallet = new DeflyWalletConnect();
  const peraWallet = new PeraWalletConnect();

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.login);
  const accountAddress = useSelector((state) => state.wallet.address);

  //reconnected wallet
  const reconnectedDeflyWallet = () => {
    const localWallet = JSON.parse(localStorage.getItem("DeflyWallet.Wallet"));
    if (isLogin)
      if (localWallet?.type === "defly-wallet")
        deflyWallet
          .reconnectSession()
          .then((accounts) => {
            if (accounts.length) {
              console.log("defly wallet rec-connected");
              deflyWallet.connector?.on("disconnect", disconnectDeflyWallet);
              dispatch(redux_setDeflyWalletAddress(accounts[0]));
            }
          })
          .catch((error) => {
            console.log("dfywallet reco error: ", error);
          });
  };
  function reconnectPeraWallet() {
    const localWallet = JSON.parse(localStorage.getItem("PeraWallet.Wallet"));
    if (isLogin)
      if (localWallet?.type === "pera-wallet")
        peraWallet
          .reconnectSession()
          .then((accounts) => {
            peraWallet.connector?.on("disconnect", disconnectPeraWallet);
            if (accounts.length) {
              dispatch(redux_setPeraWalletAddress(accounts[0]));
              console.log("re-connect pera wallet");
            }
          })
          .catch((e) => console.log("pera wallet reco error: ", e));
  }

  // disconnected wallet
  const disconnectDeflyWallet = () => {
    dispatch(redux_setDeflyWalletAddress(null));
    deflyWallet.disconnect();
  };
  function disconnectPeraWallet() {
    dispatch(redux_setPeraWalletAddress(null));
    peraWallet.disconnect();
  }

  // get Coins Data
  const getCoinsData = async () => {
    try {
      const data = await API_coins_data();
      dispatch(redux_setCoinsData(data));
      console.log("coins data");
    } catch (error) {
      console.log("coins error: ".error);
    }
  };

  //get wallet info
  const getAccountInfo = async () => {
    try {
      console.log("wallet addres is :", accountAddress);
      const formData = new FormData();
      formData.append("wallet_address", accountAddress);
      // formData.append('wallet_address', 'MWR7GSIW2VYSXXQ6METWOPZDWOTAXJCOL3OVL7PBJIGG5POXESLAT5QOQE')
      const res = await API_wallet_account_info(formData);
      console.log("response is ", res);
      if (res.status === 200) {
        const { data } = res;
        dispatch(redux_setWalletInformation(data));
        return;
      }
      return;
    } catch (error) {
      console.log("wallet info error is : ", error);
    }
  };

  // get Arbitrage Apportunities
  const getArbitrageApportunities = async () => {
    try {
      const data = await API_arbigtrage_apportunies();
      if (data?.length) dispatch(redux_setApportunities(data));
      if (data?.length)
        dispatch(
          redux_setApportunitiesMethod("Buy/Sell Arbitrage Opportunities")
        );
    } catch (error) {
      console.log("error is : ", error);
    }
  };

  // hot movers
  const getHotCoinsData = async() => {
    try {
      const data = await API_hot_movers_coins();
      if (data?.length) dispatch(redux_setHotMoversCoins(data));
    } catch (error) {
      console.log('internal server');
    }
  };

  // use Effects conditionaly call functions.
  useEffect(() => {
    if (accountAddress) getAccountInfo();
  }, [accountAddress]);

  useEffect(() => {
    reconnectPeraWallet();
    reconnectedDeflyWallet();
    getArbitrageApportunities();
    // dispatch(GetAllApportunities())
  }, [isLogin]);

  //on page header load one time call that's functions
  useEffect(() => {
    getCoinsData();
    getHotCoinsData();
  }, []);
  return <>{children}</>;
}

export default Middelware;
