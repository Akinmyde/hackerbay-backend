import passwordHash from './passwordHash';
import authenticate from './authenticate';

const { generateHash, verifyHash } = passwordHash;
const { encode, decode } = authenticate;

export
{
  generateHash,
  verifyHash,
  encode,
  decode,
};
