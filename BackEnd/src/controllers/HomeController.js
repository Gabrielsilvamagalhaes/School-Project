class HomeController {
 index(req, res) {
      res.send('Im alive in controller by class method');
    }
}

export default new HomeController();
