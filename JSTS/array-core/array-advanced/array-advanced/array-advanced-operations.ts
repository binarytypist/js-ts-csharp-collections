export {};

interface Sale {
  id: number;
  user: string;
  region: string;
  amount: number;
  items: string[];
}

const sales: Sale[] = [
  { id: 1, user: "Sammit", region: "IN", amount: 120, items: ["Keyboard", "Mouse"] },
  { id: 2, user: "Maria", region: "BR", amount: 90, items: ["Monitor"] },
  { id: 3, user: "Sammit", region: "IN", amount: 150, items: ["USB", "Cable"] },
  { id: 4, user: "John", region: "US", amount: 75, items: ["Mouse"] },
  { id: 5, user: "Maria", region: "BR", amount: 210, items: ["Laptop", "Bag"] },
  { id: 6, user: "David", region: "US", amount: 45, items: ["USB"] }
];

function section(title: string): void {
  console.log("\n" + title);
  console.log("-".repeat(title.length));
}

function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function chunk<T>(array: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

function zip<A, B>(a: A[], b: B[]): Array<[A, B]> {
  const len = Math.min(a.length, b.length);
  return Array.from({ length: len }, (_, i) => [a[i], b[i]] as [A, B]);
}

function rotateLeft<T>(array: T[], k: number): T[] {
  if (array.length === 0) return [];
  const n = k % array.length;
  return array.slice(n).concat(array.slice(0, n));
}

function flattenDeep(array: Array<number | number[]>): number[] {
  return array.reduce<number[]>((acc, item) => {
    if (Array.isArray(item)) return acc.concat(flattenDeep(item));
    return acc.concat(item);
  }, []);
}

section("ADVANCED 1: Grouping and Aggregation");

const byRegion = groupBy(sales, (s) => s.region);
console.log("1 groupBy region keys:", Object.keys(byRegion));

const revenueByUser = sales.reduce<Record<string, number>>((acc, s) => {
  acc[s.user] = (acc[s.user] || 0) + s.amount;
  return acc;
}, {});
console.log("2 revenue by user:", revenueByUser);

const topSale = sales.reduce((best, s) => (s.amount > best.amount ? s : best), sales[0]);
console.log("3 max by reduce:", topSale.user, topSale.amount);

section("ADVANCED 2: Transform and Normalize");

const normalized = sales.map((s) => ({
  ...s,
  user: s.user.toLowerCase(),
  itemCount: s.items.length
}));
console.log("4 normalize map sample:", normalized[0]);

const allItems = sales.flatMap((s) => s.items);
const uniqueItems = [...new Set(allItems)].slice().sort();
console.log("5 flatMap + Set unique items:", uniqueItems);

const sortedMulti = [...sales].sort((a, b) => b.amount - a.amount || a.user.localeCompare(b.user));
console.log("6 multi-key sort first:", sortedMulti[0]);

section("ADVANCED 3: Comparison and Set Operations");

const idsA = sales.slice(0, 4).map((s) => s.id);
const idsB = [3, 4, 5, 6, 7];

const union = [...new Set(idsA.concat(idsB))];
const intersection = idsA.filter((id) => idsB.includes(id));
const difference = idsA.filter((id) => !idsB.includes(id));
console.log("7 union:", union);
console.log("8 intersection:", intersection);
console.log("9 difference A-B:", difference);

section("ADVANCED 4: Structural Utilities");

console.log("10 chunk size 2:", chunk(idsA, 2));
console.log("11 zip user+amount:", zip(sales.map((s) => s.user), sales.map((s) => s.amount)));
console.log("12 rotate left 2:", rotateLeft(idsA, 2));

const nested = [1, [2, [3, 4], 5], [6, [7]]] as Array<number | number[]>;
console.log("13 flatten deep:", flattenDeep(nested));

section("ADVANCED 5: Patterns for Interviews");

const duplicateUsers = [...new Set(sales.map((s) => s.user).filter((u, i, arr) => arr.indexOf(u) !== i))];
console.log("14 duplicates:", duplicateUsers);

const frequency = allItems.reduce<Record<string, number>>((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
console.log("15 frequency map:", frequency);

const top3Amounts = sales.map((s) => s.amount).slice().sort((a, b) => b - a).slice(0, 3);
console.log("16 top 3 amounts:", top3Amounts);

const hasLargeDeal = sales.some((s) => s.amount > 200);
const allHaveItems = sales.every((s) => s.items.length > 0);
console.log("17 some/every:", { hasLargeDeal, allHaveItems });

const pipeline = sales
  .filter((s) => s.amount >= 90)
  .map((s) => ({ user: s.user, amount: s.amount }))
  .slice()
  .sort((a, b) => b.amount - a.amount);
console.log("18 filter -> map -> toSorted:", pipeline);
