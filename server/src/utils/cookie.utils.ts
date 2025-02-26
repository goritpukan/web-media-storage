import { Request } from 'express';

export class CookieUtils {
  static getRequestJwt(token: 'access' | 'refresh') {
    return [
      (req: Request) => {
        const cookies = req.cookies;
        return cookies?.[`${token}_token`];
      },
    ];
  }
}