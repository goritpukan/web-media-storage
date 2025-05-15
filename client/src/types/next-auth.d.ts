export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
declare module 'next-auth' {
  interface Session {
    accessToken: string;
    error?: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
    user: User;
  }
}
