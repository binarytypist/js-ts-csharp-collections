const employees = [
  { id: 101, name: "Sammit", department: "Engineering", role: "Frontend", salary: 92000, active: true },
  { id: 102, name: "John", department: "Engineering", role: "Backend", salary: 98000, active: true },
  { id: 103, name: "Maria", department: "Design", role: "UI", salary: 81000, active: false },
  { id: 104, name: "David", department: "Engineering", role: "DevOps", salary: 105000, active: true },
  { id: 105, name: "Asha", department: "Design", role: "UX", salary: 86000, active: true }
];

const teamA = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" }
];

const teamB = [
  { id: 3, name: "C2" },
  { id: 1, name: "A2" },
  { id: 2, name: "B2" }
];

const expectedIds = [101, 102, 103, 104, 105, 106, 107];
const apiReturnedIds = [101, 102, 104, 105];

const apiResponse = {
  page: 1,
  total: 4,
  items: [
    {
      user_id: 201,
      first_name: "Nina",
      last_name: "Patel",
      status: "active",
      skills: ["Angular", "TypeScript"],
      created_at: "2026-07-01T10:00:00Z"
    },
    {
      user_id: 202,
      first_name: "Ravi",
      last_name: "Shah",
      status: "inactive",
      skills: ["React"],
      created_at: "2026-07-03T08:15:00Z"
    },
    {
      user_id: 203,
      first_name: "Mila",
      last_name: "Roy",
      status: "active",
      skills: ["Vue", "JavaScript"],
      created_at: "2026-07-02T14:45:00Z"
    },
    {
      user_id: 204,
      first_name: "Leo",
      last_name: "Kim",
      status: "active",
      skills: ["Angular", "RxJS"],
      created_at: "2026-07-05T09:30:00Z"
    }
  ]
};

function section(title) {
  console.log("\n" + title);
  console.log("-".repeat(title.length));
}

section("LEVEL 4 - OBJECTS (Basic to Advanced)");

// 23. Filter objects
const activeEmployees = employees.filter((e) => e.active);
console.log("23 Filter objects (active):", activeEmployees.map((e) => e.name));

// 24. Sort objects
const bySalaryAsc = employees.toSorted((a, b) => a.salary - b.salary);
console.log("24 Sort objects (salary asc):", bySalaryAsc.map((e) => e.name + " " + e.salary));

// 25. Find object
const foundEmployee = employees.find((e) => e.id === 104);
console.log("25 Find object by id=104:", foundEmployee);

// 26. Compare objects by ID
function compareObjectsById(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const ids1 = arr1.map((x) => x.id).toSorted((a, b) => a - b);
  const ids2 = arr2.map((x) => x.id).toSorted((a, b) => a - b);
  return ids1.every((id, i) => id === ids2[i]);
}
console.log("26 Compare objects by ID:", compareObjectsById(teamA, teamB));

// 27. Find missing IDs
const missingIds = expectedIds.filter((id) => !apiReturnedIds.includes(id));
console.log("27 Missing IDs:", missingIds);

// 28. GroupBy with reduce()
const groupedByDepartment = employees.reduce((acc, emp) => {
  if (!acc[emp.department]) acc[emp.department] = [];
  acc[emp.department].push(emp);
  return acc;
}, {});
console.log("28 GroupBy department:", groupedByDepartment);

// 29. Count by property
const countByDepartment = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});
console.log("29 Count by department:", countByDepartment);

// 30. Transform API response
const transformedUsers = apiResponse.items
  .map((item) => ({
    id: item.user_id,
    fullName: item.first_name + " " + item.last_name,
    isActive: item.status === "active",
    primarySkill: item.skills[0] || "Unknown",
    skillCount: item.skills.length,
    createdAt: new Date(item.created_at)
  }))
  .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

const transformedSummary = {
  total: transformedUsers.length,
  activeCount: transformedUsers.filter((u) => u.isActive).length,
  byPrimarySkill: transformedUsers.reduce((acc, u) => {
    acc[u.primarySkill] = (acc[u.primarySkill] || 0) + 1;
    return acc;
  }, {}),
  users: transformedUsers
};

console.log("30 Transform API response:", transformedSummary);
