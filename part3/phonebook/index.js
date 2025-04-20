require("dotenv").config();
const express = require("express");
const phonebook = require("./models/phonebook");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

const PORT = process.env.PORT;

app.get("/api/persons", (_, response) => {
  phonebook.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id === id);

  if (!person) {
    response.status(404);
  } else {
    response.json(person);
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!Object.keys(body)?.length) {
    response.status(400).json({ error: "request body is empty" });
  }

  const isNameExists = data.some((person) => person.name === body.name);
  if (isNameExists) {
    response.status(400).json({ error: "name must be unique" });
  }

  const newData = { id: Math.floor(Math.random() * 500), ...body };

  data.push(newData);
  response.send(request.body);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  data = data.filter((person) => person.id !== id);

  response.status(204, { body: { person: id } }).end();
});

app.get("/info", (request, response) => {
  const infoText = `<p>Phonebook has info for ${data.length ?? 0} people</p>`;
  const requestTime = `<p>${new Date()}</p>`;
  response.send(infoText + requestTime);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
