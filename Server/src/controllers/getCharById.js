const axios = require("axios");
const URL = require("../utils/consts");

const getCharById = (req, res) => {
  const { id } = req.params;
  axios(`${URL}/${id}`)
    .then((response) => response.data)
    .then((data) => {
      if (data.name) {
        const character = {
          id: data.id,
          name: data.name,
          gender: data.gender,
          species: data.species,
          origin: {
            name: data.origin?.name,
            url: data.origin?.url
          },
          image: data.image,
          status: data.status,
        };
        return res.status(200).json(character);
      }
      return res.status(404).send("Not found");
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = getCharById;
