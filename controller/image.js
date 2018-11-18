const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "31f364fb4f04452cbbffa6c93266250c"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("unable work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("score", 1)
    .returning("score")
    .then(score => res.json(score[0]))
    .catch(err => res.status(400).json("unable to get score"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
