import axios from "axios";
import { _BACKEND_BASE_URL } from "./APIRoutes";

export const api = axios.create({
  baseURL: _BACKEND_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const apiForm = axios.create({
  baseURL: _BACKEND_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export const apiXEncoded = axios.create({
  baseURL: _BACKEND_BASE_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
