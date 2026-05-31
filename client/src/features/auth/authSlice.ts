import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";
import { getDefaultPostAuthPath, getStoredAuthToken, isAdminUser, persistAuthToken } from "../../shared/utils/auth";
import { getErrorMessage, isUnauthorizedError } from "../../shared/utils/errorMessage";
import { fetchCurrentUserRequest, loginRequest, registerRequest } from "./authApi";
import type { AuthState, LoginPayload, RegisterPayload } from "./authTypes";

const initialState: AuthState = {
  token: getStoredAuthToken(),
  user: null,
  isInitialized: false,
  isLoading: false,
  error: null,
};

export const initializeAuth = createAsyncThunk<
  { token: string | null; user: AuthState["user"] },
  void,
  { rejectValue: string }
>("auth/initialize", async (_, { rejectWithValue }) => {
  const token = getStoredAuthToken();

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
    persistAuthToken(null);

    if (isUnauthorizedError(error)) {
      return {
        token: null,
        user: null,
      };
    }

    return rejectWithValue(getErrorMessage(error));
  }
});

export const login = createAsyncThunk<
  Awaited<ReturnType<typeof loginRequest>>,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const result = await loginRequest(payload);
    persistAuthToken(result.token);
    return result;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const register = createAsyncThunk<
  Awaited<ReturnType<typeof registerRequest>>,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const result = await registerRequest(payload);
    persistAuthToken(result.token);
    return result;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMe = createAsyncThunk<
  Awaited<ReturnType<typeof fetchCurrentUserRequest>>,
  void,
  { rejectValue: string }
>("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    return await fetchCurrentUserRequest();
  } catch (error) {
    if (isUnauthorizedError(error)) {
      persistAuthToken(null);
      return rejectWithValue("Сессия истекла. Войдите снова.");
    }

    return rejectWithValue(getErrorMessage(error));
  }
});

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
      persistAuthToken(null);
    },
    clearAuthError(state) {
      state.error = null;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      persistAuthToken(action.payload);
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
        state.error = action.payload ?? null;
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
        state.token = null;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload ?? "Не удалось выполнить вход.";
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
        state.token = null;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload ?? "Не удалось зарегистрироваться.";
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
        state.error = action.payload ?? "Не удалось загрузить пользователя.";
        persistAuthToken(null);
      });
  },
});

export const { clearAuthError, logout, setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token && state.auth.user);
export const selectIsAdmin = (state: RootState) => isAdminUser(state.auth.user);
export const selectPostAuthFallbackPath = (state: RootState) =>
  getDefaultPostAuthPath(state.auth.user);
