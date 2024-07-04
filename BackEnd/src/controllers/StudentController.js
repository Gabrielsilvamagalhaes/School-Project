import Student from "../models/Student";


class studentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'lastName', 'email', 'age', 'weight', 'height'],
      });
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error.message);
      return res.status(500).json(error.message);
    }
  }

  async show(req, res) {
    try {
      if(!req.params.id) return res.status(400).json({ error: 'Missing id' });
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ error: 'Student not found' });

      const { id, name, lastName, email, age, weight, height } = student;
      res.status(200).json({ id, name, lastName, email, age, weight, height });
    } catch (error) {
      console.error('Error fetching students:', error.message);
      return res.status(500).json(error.message);
    }
  }

  async create(req, res) {
    if (!req.body.name || !req.body.lastName || !req.body.email || !req.body.age || !req.body.weight || !req.body.height) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors.length > 0 ? error.errors.map(e => e.message).join(', ') : error.parent.detail
      });
    }
  }

  async update(req, res) {
    try {
      if(!req.params.id) return res.status(400).json({ error: 'Missing id' });
      const findedUser = await Student.findByPk(req.params.id);
      if (!findedUser) return res.status(404).json({ error: 'Student not found' });

      await findedUser.update(req.body);
      await findedUser.save();
      return res.status(200).json({ message: 'Student updated' });

    } catch (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors.length > 0 ? error.errors.map(e => e.message).join(', ') : error.parent.detail
      });
    }
  }

  async delete(req, res) {
    try {
      if(!req.params.id) return res.status(400).json({ error: 'Missing id' });
      const findedUser = await Student.findByPk(req.params.id);
      if (!findedUser) return res.status(404).json({ error: 'Student not found' });

      await findedUser.destroy();
      return res.status(200).json({ message: 'Student deleted sucessfully' });
    } catch (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.errors.length > 0 ? error.errors.map(e => e.message).join(', ') : error.parent.detail
      });
    }
  }
}

export default new studentController();
