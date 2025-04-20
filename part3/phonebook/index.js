require("dotenv").config();
const express = require("express");
const phonebook = require("./models/phonebook");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

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

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  phonebook
    .findById(id)
    .then((result) => {
      if (!result) {
        response.status(404);
      } else {
        response.json(result);
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const newPhonebook = new phonebook({ ...body });

  if (!Object.keys(body)?.length) {
    return response.status(400).json({ error: "request body is empty" });
  }

  phonebook.find({ name: body.name }).then((result) => {
    if (result) {
      return response.status(400).json({ error: "name must be unique" });
    }
  });

  newPhonebook
    .save()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  phonebook
    .findById(id)
    .then((result) => {
      if (!result) {
        return response.status(404).end();
      }

      const { name, number } = request.body;
      result.name = name;
      result.number = number;

      return result.save().then((updatedResult) => {
        response.json(updatedResult);
      });
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  phonebook
    .findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  phonebook
    .countDocuments()
    .then((count) => {
      const infoText = `<p>Phonebook has info for ${count ?? 0} people</p>`;
      const requestTime = `<p>${new Date()}</p>`;
      response.send(infoText + requestTime);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
