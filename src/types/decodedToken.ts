interface DecodedToken {
    exp: number;
    iat: number;
    isAdmin: boolean;
    // Ajoutez d'autres champs du token que vous utilisez
    // Par exemple, isAdmin s'il est présent dans votre token
  }
  export default DecodedToken