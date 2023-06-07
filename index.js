const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');
const { Command } = require('commander');

// (async () => {
//   const result = await addContact('Victoria', 'vidjddh@gmial.com', '4567890');

//   console.log(result);
// })();

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await listContacts();
      console.table(list);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContactById = await removeContact(id);
      console.log(removeContactById);

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
