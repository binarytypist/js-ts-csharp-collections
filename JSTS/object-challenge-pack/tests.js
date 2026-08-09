const assert = require("assert");
const {
  employees,
  teamA,
  teamB,
  idsExpected,
  idsReturned,
  apiResponse
} = require("./data");
const s = require("./solutions");

let passed = 0;

function test(name, fn) {
  fn();
  passed++;
  console.log("PASS", name);
}

test("1 filterActiveEmployees", () => {
  const out = s.filterActiveEmployees(employees);
  assert.strictEqual(out.length, 4);
  assert.deepStrictEqual(out.map((x) => x.id), [101, 102, 104, 105]);
});

test("2 sortBySalaryDesc", () => {
  const out = s.sortBySalaryDesc(employees);
  assert.deepStrictEqual(out.map((x) => x.id).slice(0, 3), [104, 102, 106]);
});

test("3 findEmployeeById", () => {
  const out = s.findEmployeeById(employees, 103);
  assert.strictEqual(out.name, "Maria");
});

test("4 compareObjectArraysById", () => {
  assert.strictEqual(s.compareObjectArraysById(teamA, teamB), true);
});

test("5 findMissingIds", () => {
  assert.deepStrictEqual(s.findMissingIds(idsExpected, idsReturned), [103, 106, 107]);
});

test("6 groupByDepartment", () => {
  const out = s.groupByDepartment(employees);
  assert.strictEqual(out.Engineering.length, 4);
  assert.strictEqual(out.Design.length, 2);
});

test("7 countByRole", () => {
  const out = s.countByRole(employees);
  assert.strictEqual(out.Frontend, 2);
  assert.strictEqual(out.Backend, 1);
  assert.strictEqual(out.DevOps, 1);
});

test("8 transformApiUsers", () => {
  const out = s.transformApiUsers(apiResponse);
  assert.strictEqual(out.length, 3);
  assert.strictEqual(out[0].id, 202);
  assert.strictEqual(out[0].fullName, "Ravi Shah");
});

test("9 uniqueSkills", () => {
  const out = s.uniqueSkills(employees);
  assert.strictEqual(out.includes("TypeScript"), true);
  assert.strictEqual(out.includes("Docker"), true);
});

test("10 intersectionById", () => {
  const left = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const right = [{ id: 2 }, { id: 4 }];
  const out = s.intersectionById(left, right);
  assert.deepStrictEqual(out, [{ id: 2 }]);
});

test("11 differenceById", () => {
  const left = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const right = [{ id: 2 }, { id: 4 }];
  const out = s.differenceById(left, right);
  assert.deepStrictEqual(out, [{ id: 1 }, { id: 3 }]);
});

test("12 mergeByIdPreferRight", () => {
  const left = [{ id: 1, name: "A" }, { id: 2, name: "B" }];
  const right = [{ id: 2, name: "B2", score: 10 }, { id: 3, name: "C" }];
  const out = s.mergeByIdPreferRight(left, right);
  const map = new Map(out.map((x) => [x.id, x]));
  assert.strictEqual(map.get(2).name, "B2");
  assert.strictEqual(map.get(2).score, 10);
  assert.strictEqual(map.get(3).name, "C");
});

test("13 topNBySalary", () => {
  const out = s.topNBySalary(employees, 2);
  assert.deepStrictEqual(out.map((x) => x.id), [104, 102]);
});

test("14 dedupeByIdStable", () => {
  const input = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 1, name: "A2" }
  ];
  const out = s.dedupeByIdStable(input);
  assert.deepStrictEqual(out, [
    { id: 1, name: "A" },
    { id: 2, name: "B" }
  ]);
});

test("15 partitionByActive", () => {
  const out = s.partitionByActive(employees);
  assert.strictEqual(out.active.length, 4);
  assert.strictEqual(out.inactive.length, 2);
});

console.log("\nAll tests passed:", passed);
