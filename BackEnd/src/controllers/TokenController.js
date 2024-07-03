import User from "../models/User";
import bcryptService from "../services/bcryptService";
import JwtService from '../services/jwtService';

class TokenController {
 async create(req, res) {
  const { email = '', password = '' } = req.body;

  //Verificando se o email e a senha foram informados
  if(!email || !password) return res.status(401).json('Credenciais inválidas');
  const user = await User.findOne({
    where: {
      email
    }
  });

  if(!user) return res.status(404).json('Usuário não encontrado');
  //Verificando se a senha é válida com o metodo compare
  const isValidPassword = await bcryptService.compare(password, user.password_hash);
  if(!isValidPassword) return res.status(401).json('Senha inválida');

  //Gerando o token
  const token = JwtService.generateToken({ id: user.id, email });
    res.status(200).json({ token: token });
  }
}

export default new TokenController();
