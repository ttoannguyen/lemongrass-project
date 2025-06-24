import api from "@/lib/axios";
import type {
  Introspect,
  LoginCredentials,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types";
import type { BaseResponse } from "@/types/BaseResponse";

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<BaseResponse<LoginResponse>> => {
    const response = await api.post<BaseResponse<LoginResponse>>(
      "/auth/login",
      credentials,
      {
        headers: {
          "x-auth-required": "false",
        },
      }
    );
    const token = response.data.result.token;
    localStorage.setItem("authToken", token);

    if (response.data.code !== 1000) {
      throw new Error("Login failed: Invalid response code");
    }
    return response.data;
  },

  register: async (
    registerData: RegisterRequest
  ): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      "/accounts/register",
      registerData,
      {
        headers: {
          "x-auth-required": "false",
        },
      }
    );
    if (response.data.code !== 1000) {
      throw new Error("Register failed: Invalid response code");
    }
    return response.data;
  },

  introspect: async (): Promise<Introspect> => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post(
        "/auth/introspect",
        { token: token },
        {
          headers: {
            "x-auth-required": "false",
          },
        }
      );
      if (response.data.code !== 1000) {
        throw new Error("Register failed: Invalid response code");
      }
      return response.data.result;
    } catch (err) {
      throw new Error(`Register failed: Invalid response code ${err}`);
    }
  },
};
