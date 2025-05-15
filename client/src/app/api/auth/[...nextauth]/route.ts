import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthUser } from '@/types/next-auth';
import { JWT } from 'next-auth/jwt';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok || !data.accessToken)
      throw new Error(data.message || 'Token refresh failed');

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: data.expiresIn,
    };
  } catch (err) {
    console.error('Error refreshing access token', err);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'username' | 'password', string> | undefined,
      ): Promise<AuthUser | null> {
        if (!credentials) return null;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (!res.ok) return null;

        const data = await res.json();

        if (data?.accessToken && data?.userDto) {
          return {
            ...data.userDto,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      if (account && user) {
        return {
          accessToken: account.accessToken,
          refreshToken: account.refreshToken,
          accessTokenExpires: account.expiresIn,
          user: account.user,
        } as JWT;
      }
      if (Date.now() < (token as JWT).accessTokenExpires) {
        return token;
      }
      return await refreshAccessToken(token as JWT);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
