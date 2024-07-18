import User from "../models/User";

class UserController {
  async create(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      res.status(201).json({ id, name, email });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(400).json({
        error: "Validation error",
        message:
          error.errors.length > 0
            ? error.errors.map((e) => e.message).join(", ")
            : error.parent.detail,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(404).json(error.message);
    }
  }

  async indexByName(req, res) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password_hash", "created_at", "updated_at"],
        },
        where: {
          name: req.params.name,
        },
      });

      if (users.length === 0)
        return res.status(404).json({ error: "No users found" });

      res.status(200).json(users);
    } catch (error) {
      console.log(
        "Error ao encontrar usuário no metodo indexByName:",
        error.message
      );
      return res.status(500).json({ error: error.message });
    }
  }
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { id, name, email } = user;
      res.status(200).json({ id, name, email });
    } catch (error) {
      console.log("Error ao encontrar usuário no metodo show:", error.message);
      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const findedUser = await User.findByPk(req.userId);
      if (!findedUser) return res.status(404).json({ error: "User not found" });

      await findedUser.update(req.body);
      await findedUser.save();

      const { id, name, email } = findedUser;
      res.status(200).json({ id, name, email });
    } catch (error) {
      console.log("Erro ao atualizar usuário no metodo update:", error.message);
      if (error.errors) {
        return res.status(400).json({
          error: "Validation error",
          message:
            error.errors.length > 0
              ? error.errors.map((e) => e.message).join(", ")
              : error.parent.detail,
        });
      }
      return res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log("Erro ao deletar usuário no metodo delete:", error.message);
      return res.status(500).json(error.message);
    }
  }
}
export default new UserController();
