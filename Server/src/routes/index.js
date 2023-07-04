const {Router} = require("express");
const mainRouter = Router();
const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const postUsers = require("../controllers/postUsers");
const postFav = require("../controllers/postFav");
const deleteFav = require("../controllers/deleteFav");


mainRouter.get("/character/:id", getCharById);

mainRouter.get("/login", login);

mainRouter.post("/login", postUsers);

mainRouter.post("/fav", postFav);

mainRouter.delete("/fav/:id", deleteFav);


module.exports = mainRouter;