export interface IUser {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      avatar?: string;
    };
    isAdmin?: boolean;
    token?: string }
  
  export default IUser