const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");

const contactsPath = "./db/contacts.json";

// TODO: udokumentuj każdą funkcję
function listContacts() {
	// odnajdź plik ze ścieżki
	const file = fs.readFile(path.resolve(contactsPath));
	// odczytaj plik
	file.then((content) => {
		// przekonwertuj zawartość pliku na ciąg znaków
		const fileStr = content.toString();
		// przekonwertuj ciąg znaków na JSON i wrzuc do tabeli
		console.table(JSON.parse(fileStr));
	});
}

function getContactById(contactId) {
	// odnajdź plik ze ścieżki
	const file = fs.readFile(path.resolve(contactsPath));
	// odczytaj plik
	file.then((content) => {
		// przekonwertuj zawartość pliku na ciąg znaków
		const fileStr = content.toString();
		// przekonwertuj ciąg znaków na JSON
		const result = JSON.parse(fileStr);
		// przefiltruj JSON w poszukiwaniu kontaktu
		console.log(result.find((contact) => contact.id === contactId));
	});
}

function removeContact(contactId) {
	// odnajdź plik ze ścieżki
	const file = fs.readFile(path.resolve(contactsPath));
	// odczytaj plik
	file.then((content) => {
		// przekonwertuj zawartość pliku na ciąg znaków
		const fileStr = content.toString();
		// przekonwertuj ciąg znaków na JSON
		const result = JSON.parse(fileStr);
		// przefiltruj JSON w poszukiwaniu kontaktu
		const afterDelete = result.filter((contact) => contact.id !== contactId);
		// zapisz przefiltrowany plik
		fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(
			() => {
				console.log("Plik został zapisany.".green);
			}
		);
	});
}

function addContact(name, email, phone) {
	// odnajdź plik ze ścieżki
	const file = fs.readFile(path.resolve(contactsPath));
	// odczytaj plik
	file.then((content) => {
		// przekonwertuj zawartość pliku na ciąg znaków
		const fileStr = content.toString();
		// przekonwertuj ciąg znaków na JSON
		const result = JSON.parse(fileStr);
		// dodaj nowy kontakt
		result.push({ id: nanoid(21), name, email, phone });
		// zapisz przefiltrowany plik
		fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(
			() => {
				console.log("Plik został zapisany.".green);
			}
		);
	});
}
module.exports = { listContacts, getContactById, removeContact, addContact };
