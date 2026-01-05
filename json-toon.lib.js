import { encode, decode } from '@toon-format/toon';

// Example 1: Simple Object
const userJson = { name: 'Alice', age: 30 };
const userToon = encode(userJson);
console.log(userToon);
// Output:
// name: Alice
// age: 30

// Example 2: Array of Objects (where TOON is most efficient)
const usersJson = [
  { id: 1, name: 'Alpha', active: true },
  { id: 2, name: 'Beta', active: false }
];
const usersToon = encode(usersJson);
console.log(usersToon);
// Output:
// users[2]{id,name,active}:
// 1,Alpha,true
// 2,Beta,false

// Decoding back to JSON
const decodedJson = decode(usersToon);
// decodedJson will be the original array of objects
console.log(decodedJson);
// Output:
// [
//   { id: 1, name: 'Alpha', active: true },
//   { id: 2, name: 'Beta', active: false }
// ]