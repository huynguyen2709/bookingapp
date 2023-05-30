import { createError } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    const error = createError(401, 'You are not authenticated!');
    next(error);
    return;
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

export const verfifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?.id === req?.params?.id || req?.user?.isAdmin) {
      next();
    } else {
      const error = createError(403, 'You are not authorized!');
      next(error);
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?.isAdmin) {
      next();
    } else {
      const error = createError(403, 'You are not authorized!');
      next(error);
    }
  });
};
