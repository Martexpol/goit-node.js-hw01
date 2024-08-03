require("colors");

const { Command } = require("commander");
const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
} = require("./contacts");
const program = new Command();
program
	.option("-a, --action <typ>", "Akcje do wykonania")
	.option("-i, --id <id>", "ID użytkownika")
	.option("-n, --name <nazwa>", "Nazwa użytkownika")
	.option("-e, --email <email>", "Adres email")
	.option("-p, --phone <telefon>", "Numer telefonu");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			listContacts();
			break;

		case "get":
			getContactById(id);
			break;

		case "add":
			addContact(name, email, phone);
			break;

		case "remove":
			removeContact(id);
			break;

		default:
			console.warn("Unknown action type!".bgRed.white);
			program.help();
	}
}

invokeAction(argv);
