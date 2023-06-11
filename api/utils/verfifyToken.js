import { createError } from './error.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  console.log('req.headers', req.headers);

  if (!authorization) {
    return next(createError(401, 'You are not authenticated!'));
  }

  const token = authorization.slice(7, authorization.length);

  console.log('wtf:', token);

  jwt.verify(token, 'this-is-fake-key', (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

export const verfifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};

export const verifyAdmin = (req, res, next) => {
  const isAdmin = req?.user?.isAdmin;
  if (isAdmin) {
    next();
  } else {
    return next(createError(403, 'You are not authorized!'));
  }
};
