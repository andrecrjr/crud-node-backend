const express = require("express");
const UserDAO = require("../controller/UserDAO");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ healthcheck: true });
});

router.post("/create_user", async (req, res, next) => {
  try {
    const user = new UserDAO(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      req.body.cpf,
      req.body.email
    );
    const data = await user.registerUser();
    return res.json(data);
  } catch (error) {
    let getError = UserAlreadyExists(error);
    res.status(401).json(getError);
  }
});

//get all users
router.get("/users", async (req, res, next) => {
  try {
    let data = await UserDAO.checkUsers();
    return res.json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
});

//find user
router.get("/user/:username", async (req, res, next) => {
  try {
    let data = await UserDAO.findUser(req.params.username);
    return res.json(data);
  } catch (error) {
    return res.json(error).status(404);
  }
});

router.put("/user/edit/:username", async (req, res, next) => {
  try {
    let data = await UserDAO.editUser(req.params.username, req.body);
    return res.json(data);
  } catch (e) {
    return res.json(e).status(404);
  }
});

router.post("/auth", async (req, res) => {
  try {
    const user = new Authentication(
      req.body.username,
      req.body.password,
      req.body.loginType
    );
    const isAuth = await user.checkUserAndPassword();
    return res.json(isAuth);
  } catch (e) {
    return res
      .status(401)
      .json({ auth: false, status: "Problema na autenticação" });
  }
});

module.exports = router;
