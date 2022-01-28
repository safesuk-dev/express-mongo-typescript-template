
export interface LoginRequest {
    email:string
    password:string
}

export interface DataStoredInToken {
    id: string;
  }
  
  export interface TokenData {
    token: string;
    expiresIn: number;
  }
  