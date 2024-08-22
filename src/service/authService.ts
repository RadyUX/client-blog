import axios from "axios";
import { jwtDecode } from "jwt-decode";
import IUser from "../types/User";

interface DecodedToken {
  exp: number;
  iat: number;
  isAdmin: boolean;
  // Ajoutez d'autres champs du token que vous utilisez
  // Par exemple, isAdmin s'il est présent dans votre token
}
 
class AuthService {
    login(email: string, password: string) {
      return axios
        .post("http://localhost:8000/login", {
            email,
          password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        
        });
    }

    register(name: string, email: string, password: string){
        return axios.post("http://localhost:8000/create",{
            name,
            email,
            password
        })
    }
  
    logout() {
      localStorage.removeItem("user");
         return axios.post("http://localhost:8000/logout")
    }

    getCurrentUser(): { decodedToken: DecodedToken; user: IUser} | null {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        const token = user.token;
        const decodedToken = jwtDecode<DecodedToken>(token);
  
        return { decodedToken, user };
      }
      return null;
    }
  
  

  } 
  
  export default new AuthService();