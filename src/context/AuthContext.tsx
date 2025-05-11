"use client";
import { auth, db } from "@/lib/firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY_1 = process.env.NEXT_PUBLIC_KEY1;
const KEY_2 = process.env.NEXT_PUBLIC_KEY2;

export interface UserProp {
  displayName: string | null;
  photoUrl: string | "";
  email: string | null;
  uid: string;
}

interface AuthProps {
  isLoading: boolean;
  user: UserProp;
  isLogIn: boolean;
  setIsLogin: (isLogIn: boolean) => void;
  googleSignIn: () => void;
  logOut: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthProps>({
  isLogIn: false,
  isAdmin: false,
  isLoading: false,
  setIsLogin: () => {},
  user: {
    displayName: "",
    email: "",
    photoUrl: "",
    uid: "",
  },
  googleSignIn: () => {},
  logOut: () => {},
});

interface authProps {
  children: React.ReactNode;
}
export const AuthProvider: FC<authProps> = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [user, setUser] = useState<UserProp>({
    displayName: "",
    email: "",
    photoUrl: "",
    uid: "",
  });

  function googleSignIn() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(({ user }) => {
      setDoc(doc(db, "Users", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        joined: serverTimestamp(),
        email: user.email,
      });
    });
    setIsLoading(false);
  }

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        if (user?.uid === KEY_1 || user?.uid === KEY_2) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoUrl: user.photoURL || "",
        });
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("IS ADMIN => ", isAdmin);
  }, [isAdmin]);

  // Function to set login status
  const setLoginStatus = (loggedIn: boolean) => {
    setIsLogIn(loggedIn);
  };

  return (
    // Providing context value to children
    (<AuthContext.Provider
      value={{
        isAdmin: isAdmin,
        isLoading: isLoading,
        googleSignIn: googleSignIn,
        logOut: logOut,
        isLogIn,
        setIsLogin: setLoginStatus,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>)
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
