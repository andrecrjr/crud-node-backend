const express = require("express");
const UserDAO = require("../controller/UserDAO");
const Authentication = require("../controller/Authentication");
const { UserAlreadyExists } = require("./helper");

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
      req.body.email,
      req.body.telephone,
      req.body.isAdmin
    );
    const data = await user.registerUser();
    return res.json(data);
  } catch (error) {
    let getError = UserAlreadyExists(error);
    return res.status(401).json(getError);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    let data = await UserDAO.checkUsers();
    return res.json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.get("/user/:username", async (req, res, next) => {
  try {
    let data = await UserDAO.findUser(req.params.username);
    return res.json(data);
  } catch (error) {
    return res
      .status(404)
      .json({ error: true, info: "Não há usuario procurado, ou não existe" });
  }
});

router.put("/user/edit/:username", async (req, res, next) => {
  try {
    let data = await UserDAO.editUser(req.params.username, req.body);
    if (!data["error"]) {
      return res.json(data);
    } else {
      return res.status(403).json(data);
    }
  } catch (e) {
    return res.status(404).json({ error: true, info: "Usuário não existe!" });
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
    console.log(isAuth);
    return isAuth.auth ? res.json(isAuth) : res.status(401).json(isAuth);
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      auth: false,
      status: "Houve um problema na autenticação, tente novamente.",
    });
  }
});

module.exports = router;
