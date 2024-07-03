import Student from "../models/student";


class HomeController {
 async index(req, res) {
  const newStudent = await Student.create({
    name: 'Maira',
    lastName: 'Sampaio',
    email: 'sampaio@email.com',
    age: 21,
    weight: 50,
    height: 1.60,
  });
    res.status(201).json(newStudent);
  }
}

export default new HomeController();
