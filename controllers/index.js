import authController from './authController';
import thumbnailController from './thumbnailController';

const { signUp, login } = authController;
const { thumbnail } = thumbnailController;

export { signUp, login, thumbnail };
