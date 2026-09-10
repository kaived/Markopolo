import { createSlice } from "@reduxjs/toolkit";

// Initial state logic matches the original AuthContext.jsx
const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("markopolo_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getInitialUser(),
  loading: false,
  isAuthenticated: !!getInitialUser(),
  // Modal Management
  isAuthModalOpen: false,
  authMode: "login", // 'login' | 'signup'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Modal Controls
    openLogin: (state) => {
      state.authMode = "login";
      state.isAuthModalOpen = true;
    },
    openSignup: (state) => {
      state.authMode = "signup";
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { 
  setUser, 
  logout, 
  setLoading, 
  openLogin, 
  openSignup, 
  closeAuthModal,
  setAuthMode 
} = authSlice.actions;

export default authSlice.reducer;
