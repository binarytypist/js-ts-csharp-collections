const employees = [
  { id: 101, name: "Sammit", department: "Engineering", role: "Frontend", salary: 92000, active: true, skills: ["Angular", "TypeScript"] },
  { id: 102, name: "John", department: "Engineering", role: "Backend", salary: 98000, active: true, skills: ["Node", "SQL"] },
  { id: 103, name: "Maria", department: "Design", role: "UI", salary: 81000, active: false, skills: ["Figma", "CSS"] },
  { id: 104, name: "David", department: "Engineering", role: "DevOps", salary: 105000, active: true, skills: ["AWS", "Docker"] },
  { id: 105, name: "Asha", department: "Design", role: "UX", salary: 86000, active: true, skills: ["Research", "Figma"] },
  { id: 106, name: "Leo", department: "Engineering", role: "Frontend", salary: 94000, active: false, skills: ["React", "TypeScript"] }
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

const idsExpected = [101, 102, 103, 104, 105, 106, 107];
const idsReturned = [101, 102, 104, 105];

const apiResponse = {
  page: 1,
  total: 3,
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
    }
  ]
};

module.exports = {
  employees,
  teamA,
  teamB,
  idsExpected,
  idsReturned,
  apiResponse
};
