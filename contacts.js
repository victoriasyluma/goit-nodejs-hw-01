const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');

/**
 * get list of contacts
 */
function listContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, (error, data) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(JSON.parse(data));
    });
  });
}

/**
 * get one specific contact by id, if id does not exist return error 'not found'
 */
async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => {
    return contact.id === contactId;
  });

  if (!contact) {
    throw new Error('Not found');
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
  });

  if (contacts.length === updatedContacts.length) {
    throw new Error('Not found');
  }

  const deleted = contacts.find((contact) => {
    return contact.id === contactId;
  });

  return new Promise((resolve, reject) => {
    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts),
      undefined,
      (error) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(deleted);
      }
    );
  });
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  return new Promise((resolve, reject) => {
    fs.writeFile(contactsPath, JSON.stringify(contacts), undefined, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
