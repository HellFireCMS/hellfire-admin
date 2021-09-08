import axios, { AxiosError, AxiosInstance } from "axios";
import { atom } from "jotai";
import { User } from "../models/User";

export const handleLogin = async (
  email: string,
  password: string,
  client: ApiClient
): Promise<User> => {
  let response = await client.instance.post("/auth/login", {
    email: email,
    password: password,
  })
  // console.log(response);
  const token = response.data.data.user.auth_token;
  localStorage.setItem("accessToken", token);
  const user: User = {
    email: response.data.data.user.name,
    name: response.data.data.user.name,
    authToken: response.data.data.user.auth_token,
  };

  return user;
};

export class ApiClient {
  instance: AxiosInstance;
  baseUrl?: string

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl
    })
    this.baseUrl = baseUrl
    this.initInterceptors()
  }

  initInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("accessToken");
    
      //checking if accessToken exists
      if (accessToken) {
        config.headers["Authorization"] = accessToken;
      }
      return config;
    });
    
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        let err: AxiosError = error;
        const { response, config } = err;
        if (response?.status == 401) {
          localStorage.removeItem("accessToken");
        }
        throw err
      }
    );
  }
}

export const ApiClientAtom = atom<ApiClient | undefined>(undefined)
