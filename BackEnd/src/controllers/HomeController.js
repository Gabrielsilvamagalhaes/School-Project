class HomeController {
  async index(req, res) {
    res.status(200).json({ mesage: "Index" });
  }
}

export default new HomeController();
