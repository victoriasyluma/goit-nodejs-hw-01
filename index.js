const { getContactById, removeContact, addContact } = require('./contacts');

(async () => {
  const result = await addContact('Victoria', 'vidjddh@gmial.com', '4567890');

  console.log(result);
})();
