import { message as toast } from "antd";
import { api, apiForm, apiXEncoded } from "./APIConfig";
import {
  _BACKEND_ARBITRAGE_OPPORTUNITIES_URL,
  _BACKEND_COINS_DATA_GET_URL,
  _BACKEND_HOT_MOVERS_URL,
  _BACKEND_LOGIN_URL,
  _BACKEND_WALLET_INFO_GET_URL,
} from "./APIRoutes";

export const API_user_login = async (payload) => {
  try {
    const { data } = await apiXEncoded.post(_BACKEND_LOGIN_URL, payload);
    if (data?.success) toast.success(data?.message || "Login Successfully");
    if (data?.error) toast.error(data?.error || data?.message);
    return data;
  } catch (error) {
    toast.error("server internal error");
    throw error;
  }
};

export const API_wallet_account_info = async (payload) => {
  try {
    const data = await apiForm.post(_BACKEND_WALLET_INFO_GET_URL, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_coins_data = async () => {
  try {
    const { data } = await api.get(_BACKEND_COINS_DATA_GET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_arbigtrage_apportunies = async () => {
  try {
    const { data } = await api.get(_BACKEND_ARBITRAGE_OPPORTUNITIES_URL);
    return data;
  } catch (error) {
    throw error;
  }
};


export const API_hot_movers_coins = async () => {
  try {
    const { data } = await api.get(_BACKEND_HOT_MOVERS_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
