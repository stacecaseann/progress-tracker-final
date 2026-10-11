import type { User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";

//Context to store authorization concerns
//grants access to data
//grants access to the menu items
const AuthContext = createContext<{
  currentUser: User | null;
  authLoading: boolean;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}>({
  currentUser: null,
  authLoading: true,
  register: async () => {
    throw new Error("AuthContextProvider is missing");
  },
  login: async () => {
    throw new Error("AuthContextProvider is missing");
  },
  logout: async () => {
    throw new Error("AuthContextProvider is missing");
  },
  signInWithGoogle: async () => {
    throw new Error("AuthContextProvider is missing");
  },
  resetPassword: async () => {
    throw new Error("AuthContextProvider is missing");
  },
});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  function register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout(): Promise<void> {
    return signOut(auth);
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    authLoading,
    register,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
