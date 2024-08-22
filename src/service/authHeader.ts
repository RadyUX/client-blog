export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
  
    if (user && user.access_token) {
        return { 'x-access-token': user.access_token };  
    } else {
        return { 'x-access-token': null };
    }
  }