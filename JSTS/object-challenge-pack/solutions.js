function filterActiveEmployees(employees) {
  return employees.filter((e) => e.active);
}

function sortBySalaryDesc(employees) {
  return employees.toSorted((a, b) => b.salary - a.salary);
}

function findEmployeeById(employees, id) {
  return employees.find((e) => e.id === id);
}

function compareObjectArraysById(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const ids1 = arr1.map((x) => x.id).toSorted((a, b) => a - b);
  const ids2 = arr2.map((x) => x.id).toSorted((a, b) => a - b);
  return ids1.every((id, i) => id === ids2[i]);
}

function findMissingIds(expectedIds, returnedIds) {
  return expectedIds.filter((id) => !returnedIds.includes(id));
}

function groupByDepartment(employees) {
  return employees.reduce((acc, emp) => {
    if (!acc[emp.department]) acc[emp.department] = [];
    acc[emp.department].push(emp);
    return acc;
  }, {});
}

function countByRole(employees) {
  return employees.reduce((acc, emp) => {
    acc[emp.role] = (acc[emp.role] || 0) + 1;
    return acc;
  }, {});
}

function transformApiUsers(apiResponse) {
  return apiResponse.items
    .map((item) => ({
      id: item.user_id,
      fullName: item.first_name + " " + item.last_name,
      isActive: item.status === "active",
      primarySkill: item.skills[0] || "Unknown",
      skillCount: item.skills.length,
      createdAt: new Date(item.created_at)
    }))
    .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

function uniqueSkills(employees) {
  return [...new Set(employees.flatMap((e) => e.skills))];
}

function intersectionById(arr1, arr2) {
  const rightIds = new Set(arr2.map((x) => x.id));
  return arr1.filter((x) => rightIds.has(x.id));
}

function differenceById(arr1, arr2) {
  const rightIds = new Set(arr2.map((x) => x.id));
  return arr1.filter((x) => !rightIds.has(x.id));
}

function mergeByIdPreferRight(left, right) {
  const byId = new Map(left.map((x) => [x.id, x]));
  for (const item of right) {
    byId.set(item.id, { ...(byId.get(item.id) || {}), ...item });
  }
  return [...byId.values()];
}

function topNBySalary(employees, n) {
  return employees.toSorted((a, b) => b.salary - a.salary).slice(0, n);
}

function dedupeByIdStable(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      out.push(item);
    }
  }
  return out;
}

function partitionByActive(employees) {
  return employees.reduce(
    (acc, emp) => {
      if (emp.active) acc.active.push(emp);
      else acc.inactive.push(emp);
      return acc;
    },
    { active: [], inactive: [] }
  );
}

module.exports = {
  filterActiveEmployees,
  sortBySalaryDesc,
  findEmployeeById,
  compareObjectArraysById,
  findMissingIds,
  groupByDepartment,
  countByRole,
  transformApiUsers,
  uniqueSkills,
  intersectionById,
  differenceById,
  mergeByIdPreferRight,
  topNBySalary,
  dedupeByIdStable,
  partitionByActive
};
