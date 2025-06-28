import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }
}
