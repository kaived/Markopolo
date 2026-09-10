import { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  setUser, 
  logout as logoutAction, 
  setLoading, 
  openLogin as openLoginAction, 
  openSignup as openSignupAction, 
  closeAuthModal as closeAuthModalAction,
  setAuthMode as setAuthModeAction
} from "../../../store/slices/authSlice";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  
  // Select state from Redux
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const isAuthModalOpen = useSelector((state) => state.auth.isAuthModalOpen);
  const authMode = useSelector((state) => state.auth.authMode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const login = (email, password) => {
    // Simulated login logic migrated from original context
    const normalizedEmail = email.toLowerCase();
    let role = "user";
    if (normalizedEmail.includes("admin")) {
      role = "admin";
    }
    
    let name = "Regular User";
    if (role === "admin") name = "Admin User";

    const userData = { email, role, name };
    
    dispatch(setUser(userData));
    localStorage.setItem("markopolo_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("markopolo_user");
  };

  // Modal Control Functions bridged to Redux
  const openLogin = () => dispatch(openLoginAction());
  const openSignup = () => dispatch(openSignupAction());
  const closeAuthModal = () => dispatch(closeAuthModalAction());
  const setAuthMode = (mode) => dispatch(setAuthModeAction(mode));

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      loading,
      isAuthModalOpen,
      authMode,
      openLogin,
      openSignup,
      closeAuthModal,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
