import jsonwebToken from 'jsonwebtoken';

export default class JwtService {
  static generateToken(payload) {
    return jsonwebToken.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }
}
