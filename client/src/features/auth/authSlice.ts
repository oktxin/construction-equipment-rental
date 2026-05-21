import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";
import { fetchCurrentUserRequest, loginRequest, registerRequest } from "./authApi";
import type { AuthState, LoginPayload, RegisterPayload } from "./authTypes";

const AUTH_TOKEN_STORAGE_KEY = "buildrent.auth.token";

function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

function persistToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}

const initialState: AuthState = {
  token: null,
  user: null,
  isInitialized: false,
  isLoading: false,
  error: null,
};

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();

    if (!token) {
      return {
        token: null,
        user: null,
      };
    }

    try {
      const user = await fetchCurrentUserRequest();
      return { token, user };
    } catch (error) {
      persistToken(null);
      return rejectWithValue("Session expired. Please sign in again.");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const result = await loginRequest(payload);
      persistToken(result.token);
      return result;
    } catch (error) {
      return rejectWithValue("Unable to sign in with the provided credentials.");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const result = await registerRequest(payload);
      persistToken(result.token);
      return result;
    } catch (error) {
      return rejectWithValue("Unable to create the account right now.");
    }
  },
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCurrentUserRequest();
    } catch (error) {
      return rejectWithValue("Unable to load the current user.");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isInitialized = true;
      state.isLoading = false;
      state.error = null;
      persistToken(null);
    },
    clearAuthError(state) {
      state.error = null;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      persistToken(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = (action.payload as string) ?? null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Unable to sign in.";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Unable to register.";
      })
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isInitialized = true;
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Unable to load the user.";
        persistToken(null);
      });
  },
});

export const { clearAuthError, logout, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token && state.auth.user);
export const selectIsAdmin = (state: RootState) => state.auth.user?.role.name === "ADMIN";
