const express = require("express");
const app = express();

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
