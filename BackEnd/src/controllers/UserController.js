import User from "../models/User";


class UserController {
 async create(req, res) {
    const newUser = await User.create ({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
     });
    res.status(201).json(newUser);
  }
}

export default new UserController();
