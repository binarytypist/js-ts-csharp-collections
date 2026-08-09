// Object methods examples in TypeScript

type User = {
  id: number;
  name: string;
  role: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
};

const user: User = {
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
const profileEntries: [string, string][] = [
  ["name", "Mia"],
  ["role", "editor"],
];
console.log(Object.fromEntries(profileEntries) as Record<string, string>);

console.log("Object.assign");
type Config = {
  theme: string;
  language: string;
};

const defaults: Config = { theme: "light", language: "en" };
const overrides: Partial<Config> = { language: "fr" };
console.log(Object.assign({}, defaults, overrides) as Config);

console.log("spread merge");
console.log({ ...defaults, ...overrides } as Config);

console.log("structuredClone");
const original: User = {
  id: 2,
  name: "Noah",
  role: "editor",
  preferences: { theme: "dark", notifications: false },
};
const copy: User = structuredClone(original);
copy.preferences.theme = "light";
console.log(original.preferences.theme);

console.log("Object.hasOwn");
const dictionary: Record<string, number> = Object.create(null);
dictionary.apple = 3;
console.log(Object.hasOwn(dictionary, "apple"));
console.log(Object.hasOwn(dictionary, "toString"));

console.log("Object.freeze");
const frozen = Object.freeze({ name: "Ava" });
// frozen.name = "Mia"; // TypeScript error
console.log(frozen);

console.log("Object.seal");
const sealed = Object.seal({ count: 1 });
sealed.count = 2;
// sealed.extra = true; // TypeScript error
console.log(sealed);

console.log("Object.preventExtensions");
const limited = Object.preventExtensions({ name: "Ava" });
limited.name = "Mia";
// limited.role = "admin"; // TypeScript error
console.log(limited);

console.log("Object.create");
const nullProto: Record<string, number> = Object.create(null);
nullProto.apple = 3;
nullProto.orange = 5;
console.log(Object.keys(nullProto));
