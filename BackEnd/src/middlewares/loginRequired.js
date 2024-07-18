import JwtService from "../services/jwtService";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Login required" });
  }

  const [, token] = authorization.split(" ");
  try {
    const data = JwtService.verifyToken(token);
    const { id, email } = data;

    //Se esse usuário  não existir, o email dele não está batendo com o do token ou o id não está batendo com o do token, então ele não está logado
    const user = await User.findOne({
      where: {
        id,
        // email
      },
    });

    if (!user) return res.status(401).json({ message: "User is invalid!" });

    req.userId = id;
    req.userEmail = email;

    return next(); //Se o usuário for logado, o próximo middleware será chamado.
  } catch (e) {
    console.log("Error ao verificar token:", e.message);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
