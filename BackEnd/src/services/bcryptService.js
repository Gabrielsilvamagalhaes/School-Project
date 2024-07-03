import bcrypt from 'bcryptjs'

const saltRounds = 8;

class BcryptService {
  cryptedPass(pass) {
    return bcrypt.hashSync(pass, saltRounds);
  }

  compare(pass, hashPass) {
    return bcrypt.compare(pass, hashPass);
  }
}

export default new BcryptService();

