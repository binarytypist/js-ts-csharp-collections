// Object methods examples in JavaScript

const user = {
  id: 1,
  name: "Ava",
  role: "admin",
  preferences: {
    theme: "dark",
    notifications: true,
  },
};

console.log("Object.keys");
console.log(Object.keys(user));

console.log("Object.values");
console.log(Object.values(user));

console.log("Object.entries");
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}

console.log("Object.fromEntries");
const profileEntries = [
  ["name", "Mia"],
  ["role", "editor"],
];
console.log(Object.fromEntries(profileEntries));

console.log("Object.assign");
const defaults = { theme: "light", language: "en" };
const overrides = { language: "fr" };
console.log(Object.assign({}, defaults, overrides));

console.log("spread merge");
console.log({ ...defaults, ...overrides });

console.log("structuredClone");
const original = {
  name: "Ava",
  preferences: { theme: "dark" },
};
const copy = structuredClone(original);
copy.preferences.theme = "light";
console.log(original.preferences.theme);

console.log("Object.hasOwn");
const dictionary = Object.create(null);
dictionary.apple = 3;
console.log(Object.hasOwn(dictionary, "apple"));
console.log(Object.hasOwn(dictionary, "toString"));

console.log("Object.freeze");
const frozen = Object.freeze({ name: "Ava" });
frozen.name = "Mia";
console.log(frozen);

console.log("Object.seal");
const sealed = Object.seal({ count: 1 });
sealed.count = 2;
sealed.extra = true;
console.log(sealed);

console.log("Object.preventExtensions");
const limited = Object.preventExtensions({ name: "Ava" });
limited.name = "Mia";
limited.role = "admin";
console.log(limited);

console.log("Object.create");
const nullProto = Object.create(null);
nullProto.apple = 3;
nullProto.orange = 5;
console.log(Object.keys(nullProto));
