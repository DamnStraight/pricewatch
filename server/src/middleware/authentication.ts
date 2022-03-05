import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { Action, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { getConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import { env } from '../utility/env';

export interface TokenPayload extends JwtPayload {
  id: number;
}

const getBearerToken = (header: string): string | null => {
  const BEARER = 'Bearer ';

  if (header.startsWith(BEARER)) {
    return header.slice(BEARER.length, header.length);
  }

  return null;
};

/**
 * Attempts to get the User authenticated by the JWT token
 */
export const currentUserChecker = async (action: Action) => {
  try {
    const header: string | undefined = action.request.headers['authorization'];

    if (header === undefined) {
      return new UnauthorizedError();
    }

    const token = getBearerToken(header);

    if (token === null) {
      return new UnauthorizedError();
    }

    const { id } = decode(token) as TokenPayload;

    return await getConnection().getRepository(User).findOne(id);
  } catch {
    return new NotFoundError();
  }
};

/**
 * Verify if the JWT token is valid and then validate the user against the provided roles
 */
export const authorizationChecker = async (action: Action, roles: string[] = []) => {
  const header: string | undefined = action.request.headers['authorization'];

  if (!header) {
    return false;
  }

  const token = getBearerToken(header) ?? '';

  try {
    const { id } = verify(token, env('JWT_SECRET')) as TokenPayload;

    const maybeUser = await getConnection().getRepository(User).findOne(id);

    if (maybeUser === undefined) {
      return false;
    }

    if (roles.length > 0 && !roles.includes(maybeUser.role)) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
};
