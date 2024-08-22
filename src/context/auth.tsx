
import { ReactNode, createContext, useEffect, useState } from "react";
import authService from "../service/authService";
import IUser from "../types/User";
import DecodedToken from "../types/decodedToken";


interface AuthContextType {
  currentUser:  { decodedToken: DecodedToken; user: IUser} | null
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const defaultAuthContext: AuthContextType = {
  currentUser: null,
  login: async () => {},
  logout: () => {}
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    console.log("current user : " ,currentUser?.user.user.name)
    console.log("admin ?", currentUser?.decodedToken.isAdmin)
    if (!currentUser) {
      console.log(currentUser)
    } else {
      setCurrentUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
  }; 

  const logout = () => {
    authService.logout().then(() => {
      setCurrentUser(null);
      
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Example usage of the AuthContext in a component
