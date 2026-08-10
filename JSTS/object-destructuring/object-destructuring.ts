// Object destructuring practice in TypeScript

interface Address {
  city: string;
  country: string;
}

interface User {
  name: string;
  age: number;
  city: string;
}

interface Profile {
  user: {
    id: number;
    name: string;
    address: Address;
  };
  role: string;
}

interface Person {
  id: number;
  name: string;
}

interface Employee {
  role: string;
  active: boolean;
}

const user: User = { name: 'Ava', age: 28, city: 'Berlin' };
const { name, age } = user;
console.log('Direct object destructuring:', name, age);

const profile: Profile = {
  user: {
    id: 1,
    name: 'Noah',
    address: { city: 'Paris', country: 'France' },
  },
  role: 'admin',
};

const {
  user: {
    name: userName,
    address: { city: userCity },
  },
} = profile;
console.log('Nested object destructuring:', userName, userCity);

const team: Person[] = [
  { id: 1, name: 'Mina' },
  { id: 2, name: 'Leo' },
];

const [{ name: firstTeamMember }, secondTeamMember] = team;
console.log('Combining object and array destructuring:', firstTeamMember, secondTeamMember.name);

const people: Person[] = [
  { id: 1, name: 'Sara' },
  { id: 2, name: 'Ali' },
];

for (const { name } of people) {
  console.log('Loop destructuring:', name);
}

function displayUser({ name, age }: User): void {
  console.log(`Function argument destructuring: ${name} is ${age}`);
}

displayUser(user);

const employee: Employee = { role: 'developer', active: true };
const details: Partial<User> = { name: 'Lina', age: 30 };
const copiedEmployee = { ...employee, ...details };
console.log('Copying properties into a new object:', copiedEmployee);

const base = { status: 'ready' };
const meta = { createdBy: 'Sam' };
const merged = { ...base, ...meta, ...user };
console.log('Copying properties from multiple objects:', merged);

const config = {
  server: { host: 'localhost', port: 3000 },
  features: ['auth', 'cache'],
};

const {
  server: { host, port },
  features: [featureOne, featureTwo],
} = config;
console.log('Practice exercise result:', host, port, featureOne, featureTwo);
