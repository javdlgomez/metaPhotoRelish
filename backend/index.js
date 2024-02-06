const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

app.use(cors());

const querySchema = Joi.object({
  title: Joi.string().default(""),
  "album.title": Joi.string().default(""),
  "album.user.email": Joi.string().default(""),
  limit: Joi.number().greater(0).default(25).integer(),
  offset: Joi.number().min(0).default(0).integer(),
}).unknown(false);

const pathSchema = Joi.object({
  id: Joi.number().greater(0).required().integer().less(5001),
});

const primerIncisoGet = require("./routes/externalapi/photos/get.js");

const segundoIncisoGet = require("./routes/externalapi/photos/list.js");

app.get(
  "/externalapi/photos/:id",
  validator.params(pathSchema),
  primerIncisoGet
);

app.get("/externalapi/photos", validator.query(querySchema), segundoIncisoGet);

app.listen(PORT, () => {
  console.log(`Servidor Funcionando`);
});
