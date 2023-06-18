const {Router} = require("express");
const mainRouter = Router();
const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const {postFav, deleteFav} = require("../controllers/handleFavorites");


mainRouter.get("/character/:id", getCharById);

mainRouter.get("/login", login);

mainRouter.post("/fav", postFav);

mainRouter.delete("/fav/:id", deleteFav);


module.exports = mainRouter;