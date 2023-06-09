const axios = require("axios");
const URL = require("../utils/consts");

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = (await axios(`${URL}/${id}`)).data;

    if (data.name) {
      const character = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin?.name,
        image: data?.image,
        status: data.status,
      };
      return res.status(200).json(character);
    }
  } catch (err) {
    return res.status(500).json({err: err.message});
  }
};

module.exports = getCharById;