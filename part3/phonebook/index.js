const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

const PORT = 3001;

let data = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(data);
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
	console.log(typeof body);
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

	data = data.filter((person) => person.id === id);

	response.status(204).end();
});

app.get("/info", (request, response) => {
	const infoText = `<p>Phonebook has info for ${data.length ?? 0} people</p>`;
	const requestTime = `<p>${new Date()}</p>`;
	response.send(infoText + requestTime);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
