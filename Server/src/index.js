const http = require("http");
const getCharById = require("./controllers/getCharById");

http
  .createServer((req, res) => {
    const { url } = req; // /rickandmorty/character/1

    res.setHeader("Access-Control-Allow-Origin", "*");

    if(url.includes("/rickandmorty/character")) {
      let id = url.split("/").at(-1);
      getCharById(res, id);
    }
    
  })
  .listen(3001);
