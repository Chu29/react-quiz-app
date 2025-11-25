import ky from "ky";
import { BASE_URL } from "../utils/constants";

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 3000,
  retry: 3,
  headers:{
    'Accept': 'application/json'
  }
});
