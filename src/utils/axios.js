import axios from "axios";
import { base_url } from "../config";

// Create instance called instance
const instance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
