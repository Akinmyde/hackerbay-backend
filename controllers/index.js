import authController from './authController';
import thumbnailController from './thumbnailController';
import patchController from './patchController';

const { signUp, login } = authController;
const { thumbnail } = thumbnailController;
const { patch } = patchController;

export {
  signUp,
  login,
  thumbnail,
  patch,
};
