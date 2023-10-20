import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import investorService from '@/axios/investor';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: {
            label: 'Email:',
            type: 'email',
            placeholder: 'Введите email',
          },
          password: {
            label: 'password:',
            type: 'password',
            placeholder: 'Напечатайте пароль',
          },
        },
        async authorize(credentials) {
          if (!credentials) return null;

          try {
            const response = await investorService.auth.login(credentials);

            const sessionIdCookie: string | undefined = (response.headers['set-cookie'] as string[])
              .find(cookie => cookie.includes('connect.sid'))
              ?.match(new RegExp(`^${'connect.sid'}=(.+?);`))?.[1];

            if (!sessionIdCookie) return null;

            cookies().set({
              name: 'connect.sid',
              value: decodeURIComponent(sessionIdCookie),
              httpOnly: true,
              // secure: true,
            });
            console.log('sessionIdCookie', sessionIdCookie);
            console.log('decodeURIComponent sessionIdCookie', decodeURIComponent(sessionIdCookie));
            console.log('after set', cookies().get('connect.sid'));
            return response.data;
          } catch (e) {
            console.log('CredentialsProvider authorizer ERROR', e);
            return null;
          }
        },
      }),
    ],
    callbacks: {
      // https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
      async jwt({ token, user, profile }) {
        if (user) token.role = user.role;
        return token;
      },
      // If you want to use the role in client components
      async session({ session, token, user }) {
        if (session?.user) session.user.role = token.role;
        return session;
      },
    },
    events: {
      async signOut(message) {
        cookies().delete('connect.sid');
      },
    },
    logger: {
      error(code, metadata) {
        console.error('[NEXT_AUTH LOGGER]:', code, metadata);
      },
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, nextAuthOptions(req, res));
};

export default handler;

// export const options: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email:',
//           type: 'email',
//           placeholder: 'Введите email',
//         },
//         password: {
//           label: 'password:',
//           type: 'password',
//           placeholder: 'Напечатайте пароль',
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;

//         const user = await investorService.auth
//           .login(credentials)
//           .then((res) => {
//             const user = res.data;
//             return user;
//           })
//           .catch((e) => {
//             console.log('LOGIN METHOD ERROR', e.response.data);
//             return null;
//           });

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     // https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
//     async jwt({ token, user, profile }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     // If you want to use the role in client components
//     async session({ session, token, user }) {
//       if (session?.user) session.user.role = token.role;
//       return session;
//     },
//   },
// };
