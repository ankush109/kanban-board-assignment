import axios from "axios";

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URI}/v1`,
    headers: {
      "Content-Type": "application/json",
    },
  });