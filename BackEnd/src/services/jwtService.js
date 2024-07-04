import jsonwebToken from 'jsonwebtoken';

export default class JwtService {
  static generateToken(payload) {
    return jsonwebToken.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }

  static verifyToken(token) {
    return jsonwebToken.verify(token, process.env.TOKEN_SECRET);
  }
}
