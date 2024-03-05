import { message as toast } from "antd";
import { api, apiForm, apiXEncoded } from "./APIConfig";

import {
  _BACKEND_ARBITRAGE_OPPORTUNITIES_URL,
  _BACKEND_COINS_DATA_GET_URL,
  _BACKEND_HOT_MOVERS_URL,
  _BACKEND_LOGIN_URL,
  _BACKEND_PASSWORD_FORGOT_URL,
  _BACKEND_DEX_PROVIDER_URL,
  _BACKEND_SIGNUP_URL,
  _BACKEND_WALLET_INFO_GET_URL,
  _BACKEND_ASSETS_LIST_URL,
  _BACKEND_POOL_DATA_URL,
  _BACKEND_POOL_FOR_PACT_URL,
  _BACKEND_POOL_FOR_TINYMAN_URL,
  _BACKEND_HOT_MOVERS2_URL,
  _BACKEND_SUPPORTED_VS_CURRENCIES_URL,
  _BACKEND_TRANSACTION_ALGORAND_OFFICAL_ASSETS_GET_URL,
  _BACKEND_MXC_DATA_GET_URL,
  _BACKEND_KUCOIN_DATA_GET_URL,
  _BACKEND_BINANCE_DATA_GET_URL,
  _BACKEND_TRANSACTION_ALGORAND_MAINNET_URL,
  _BACKEND_TRANSACTION_ALGORAND_MAIN_GET_URL,
  _BACKEND_TRANSACTION_ALGORAND_TEST_URL,
  _BACKEND_TRANSACTION_ALGORAND_TESTNET_URL,
  _BACKEND_TRANSACTION_PENDING_MAIN_URL,
  _BACKEND_TRANSACTION_PENDING_TEST_URL,
  _BACKEND_MINNET_ACCOUNT_INFO_URL,
  _BACKEND_TESTNET_ACCOUNT_INFO_URL,
} from "./APIRoutes";

//get methods
export const API_coins_data = async () => {
  try {
    const { data } = await api.get(_BACKEND_COINS_DATA_GET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_assets_list_get = async (id) => {
  if (!id) return toast.error("give item id.");
  try {
    const { data } = await api.get(
      _BACKEND_ASSETS_LIST_URL + `?provider=${id}&currency=usd`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_pool_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_POOL_DATA_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_pool_for_pact_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_POOL_FOR_PACT_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_pool_for_tinyman_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_POOL_FOR_TINYMAN_URL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_hot_mover2_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_HOT_MOVERS2_URL);
    if (data?.success) return data;
    toast.error(data?.message);
    return { data: [] };
  } catch (error) {
    throw error;
  }
};
export const API_support_vs_currency_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_SUPPORTED_VS_CURRENCIES_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_trasaction_algorand_offical_assets_get = async () => {
  try {
    const { data } = await api.get(
      _BACKEND_TRANSACTION_ALGORAND_OFFICAL_ASSETS_GET_URL
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_MXC_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_MXC_DATA_GET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_kucoin_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_KUCOIN_DATA_GET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_binance_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_BINANCE_DATA_GET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};

export const API_transaction_algrorand_mainnet_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_ALGORAND_MAINNET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_transaction_algrorand_main_pendding_get = async (walletAddress) => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_PENDING_MAIN_URL+walletAddress+'/');
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_transaction_algrorand_testnet_data_get = async () => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_ALGORAND_TESTNET_URL);
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_transaction_algrorand_test_pendding_get = async (walletAddress) => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_PENDING_TEST_URL+walletAddress+'/');
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_transaction_algrorand_main_search = async (id) => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_ALGORAND_MAIN_GET_URL+id+'/');
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_transaction_algrorand_testnet_search = async (id) => {
  try {
    const { data } = await api.get(_BACKEND_TRANSACTION_ALGORAND_TEST_URL+id+'/');
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_minnet_account_info_get = async (walletAddress) => {
  try {
    const { data } = await api.get(_BACKEND_MINNET_ACCOUNT_INFO_URL+walletAddress+'/');
    return data;
  } catch (error) {
    throw error;
  }
};
export const API_testnet_account_info_get = async (walletAddress) => {
  try {
    const { data } = await api.get(_BACKEND_TESTNET_ACCOUNT_INFO_URL+walletAddress+'/');
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

//post methods
export const API_user_login = async (payload) => {
  try {
    const { data } = await apiXEncoded.post(_BACKEND_LOGIN_URL, payload);
    if (data?.success) toast.success(data?.message || "Login Successfully");
    if (data?.error) toast.error(data?.error || data?.message);
    return data;
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data)
      for (let key in data) {
        if (Array.isArray(data[key]) && typeof variable !== "string")
          toast.error(data[key][0]);
        else toast.error(data[key]);
      }
    else toast.error(error?.message || "server internal error");

    throw error;
  }
};

export const API_user_register = async (payload) => {
  try {
    const { data } = await apiForm.post(_BACKEND_SIGNUP_URL, payload);
    if (data?.success == true) {
      toast.success(data?.message || "Successfully user registred.");
    } else {
      toast.error(data?.error || data?.message);
    }
    return data;
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data)
      for (let key in data) {
        if (Array.isArray(data[key]) && typeof variable !== "string")
          toast.error(data[key][0]);
        else toast.error(data[key]);
      }
    else toast.error(error?.message || "server internal error");

    throw error;
  }
};

export const API_user_password_forgot = async (payload) => {
  try {
    const { data } = await apiForm.post(_BACKEND_PASSWORD_FORGOT_URL, payload);
    if (data?.success) {
      toast.success(data?.message || "Check mail box.");
    } else {
      toast.error(data?.error || data?.message);
    }
    return data;
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data)
      for (let key in data) {
        if (Array.isArray(data[key]) && typeof variable !== "string")
          toast.error(data[key][0]);
        else toast.error(data[key]);
      }
    else toast.error(error?.message || "server internal error");

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

export const API_DEX_Provider_data_get = async (payload) => {
  try {
    const { data } = await api.post(_BACKEND_DEX_PROVIDER_URL, payload);
    return data;
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data)
      for (let key in data) {
        if (Array.isArray(data[key]) && typeof variable !== "string")
          toast.error(data[key][0]);
        else toast.error(data[key]);
      }
    else toast.error(error?.message || "server internal error");

    throw error;
  }
};
