// ============================================================
// PRACTICAL JAVASCRIPT SOLUTIONS
// ============================================================
//
// This file covers:
//
// 1. filter()
// 2. map()
// 3. find()
// 4. reduce()
// 5. sorting
// 6. removing duplicates
// 7. grouping data
// 8. array comparison
// 9. higher-order functions
// 10. closures
// 11. searching
// 12. pagination
// 13. async / await
// 14. Promise.all()
// 15. debounce
// 16. retry
// 17. caching with Map + closure
// 18. Employee management
// 19. Angular + RxJS concepts
// 20. Angular Signals concepts
//
// ============================================================


// ============================================================
// DATA
// ============================================================

const users = [
  { id: 1, name: "Sammit", active: true },
  { id: 2, name: "John", active: false },
  { id: 3, name: "Anna", active: true }
];

const orders = [
  { product: "Laptop", price: 1000, quantity: 2 },
  { product: "Mouse", price: 50, quantity: 3 },
  { product: "Keyboard", price: 100, quantity: 1 }
];

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Monitor", price: 400 },
  { name: "Tablet", price: 600 }
];

const numbers = [
  1, 2, 3, 2, 4, 1, 5, 3
];

const ageUsers = [
  { name: "Sammit", age: 30 },
  { name: "John", age: 25 },
  { name: "Anna", age: 30 },
  { name: "Peter", age: 25 }
];

const frontend = [
  "Angular",
  "React",
  "Vue",
  "JavaScript"
];

const backend = [
  "Node.js",
  "JavaScript",
  "C#",
  "Angular"
];


// ============================================================
// 1. GET ACTIVE USERS
// ============================================================
//
// filter()
// --------
// Returns a NEW array containing only elements
// that satisfy the condition.
//
// Original:
// Sammit -> true
// John   -> false
// Anna   -> true
//
// Result:
// [Sammit, Anna]

function getActiveUsers(list) {
  return list.filter(
    (user) => user.active
  );
}

console.log(
  "1) Active users:",
  getActiveUsers(users)
);


// ============================================================
// 2. GET USER NAMES
// ============================================================
//
// map()
// -----
// Transforms every element into another value.
//
// User object:
// { id: 1, name: "Sammit" }
//
// becomes:
// "Sammit"
//
// Result:
// ["Sammit", "John", "Anna"]

function getUserNames(list) {
  return list.map(
    (user) => user.name
  );
}

console.log(
  "2) User names:",
  getUserNames(users)
);


// ============================================================
// 3. FIND USER BY ID
// ============================================================
//
// find()
// ------
// Returns the FIRST element matching
// the condition.
//
// If nothing is found:
// undefined

function findUserById(list, id) {
  return list.find(
    (user) => user.id === id
  );
}

console.log(
  "3) User with id 2:",
  findUserById(users, 2)
);


// ============================================================
// 4. CALCULATE TOTAL ORDER PRICE
// ============================================================
//
// reduce()
// --------
// Used when we want ONE final result
// from many array elements.
//
// Formula:
//
// price × quantity
//
// Laptop:
// 1000 × 2 = 2000
//
// Mouse:
// 50 × 3 = 150
//
// Keyboard:
// 100 × 1 = 100
//
// Total:
// 2250

function getTotalOrderPrice(list) {
  return list.reduce(
    (total, order) =>
      total + order.price * order.quantity,
    0
  );
}

console.log(
  "4) Total order price:",
  getTotalOrderPrice(orders)
);


// ============================================================
// 5. FIND MOST EXPENSIVE PRODUCT
// ============================================================
//
// reduce() can also be used to find
// the maximum object.
//
// Start with products[0].
//
// Compare each product with the current
// maximum.
//
// If current price is greater,
// current product becomes the new maximum.

function getMostExpensiveProduct(list) {
  return list.reduce(
    (max, product) =>
      product.price > max.price
        ? product
        : max,
    list[0]
  );
}

console.log(
  "5) Most expensive product:",
  getMostExpensiveProduct(products)
);


// ============================================================
// 6. REMOVE DUPLICATES WITHOUT SET
// ============================================================
//
// We create an empty array.
//
// For every value:
//
// If the value does NOT already exist,
// add it.
//
// includes()
// ----------
// Checks whether an array contains a value.

function removeDuplicatesWithoutSet(list) {
  const unique = [];

  for (const value of list) {
    if (!unique.includes(value)) {
      unique.push(value);
    }
  }

  return unique;
}

console.log(
  "6) Remove duplicates without Set:",
  removeDuplicatesWithoutSet(numbers)
);


// ============================================================
// 7. REMOVE DUPLICATES WITH SET
// ============================================================
//
// Set automatically stores unique values.
//
// [...new Set(array)]
//
// Step 1:
// new Set(numbers)
//
// removes duplicates.
//
// Step 2:
// [...]
// converts the Set back into an array.

function removeDuplicatesWithSet(list) {
  return [...new Set(list)];
}

console.log(
  "7) Remove duplicates with Set:",
  removeDuplicatesWithSet(numbers)
);


// ============================================================
// 8. GROUP USERS BY AGE
// ============================================================
//
// reduce() can be used for grouping.
//
// We create an object:
//
// {
//   25: [],
//   30: []
// }
//
// Then push names into the correct group.
//
// Result:
//
// {
//   25: ["John", "Peter"],
//   30: ["Sammit", "Anna"]
// }

function groupUsersByAge(list) {
  return list.reduce(
    (groups, user) => {

      const age = user.age;

      // Create the array if this age
      // does not exist yet.
      if (!groups[age]) {
        groups[age] = [];
      }

      groups[age].push(user.name);

      return groups;

    },
    {}
  );
}

console.log(
  "8) Group users by age:",
  groupUsersByAge(ageUsers)
);


// ============================================================
// 9. FIND COMMON ITEMS
// ============================================================
//
// filter()
// keeps items from the first array.
//
// includes()
// checks whether the second array
// contains the item.
//
// Angular -> backend? YES
// React   -> backend? NO
// Vue     -> backend? NO
// JavaScript -> backend? YES
//
// Result:
// ["Angular", "JavaScript"]

function findCommonItems(a, b) {
  return a.filter(
    (item) => b.includes(item)
  );
}

console.log(
  "9) Common items:",
  findCommonItems(frontend, backend)
);


// ============================================================
// 10. COMPARE TWO ARRAYS REGARDLESS OF ORDER
// ============================================================
//
// Example:
//
// ["Angular", "React", "Vue"]
//
// and:
//
// ["Vue", "Angular", "React"]
//
// should return true.
//
// First check length.
//
// Then copy and sort both arrays.
//
// IMPORTANT:
// [...a] creates a copy so sort()
// does not modify the original array.
//
// This solution assumes:
// - primitive values
// - duplicate counts matter
//
// Example:
//
// [1, 1, 2]
// [1, 2, 2]
//
// returns false.

function arraysEqual(a, b) {

  // Different lengths cannot be equal.
  if (a.length !== b.length) {
    return false;
  }

  // Copy before sorting.
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  // Compare every value.
  //
  // Take each value from sortedA,
  // and compare it with the value at the same
  // position in sortedB.
  //
  // Example:
  //
  // const sortedA = ["m", "mit", "sa"];
  // const sortedB = ["m", "mit", "sa"];
  //
  // every() runs like this:
  //
  // First iteration:
  // value = "m"
  // index = 0
  //
  // value === sortedB[index]
  //
  // "m" === sortedB[0]
  //
  // "m" === "m" // true
  //
  // Second iteration:
  // value = "mit"
  // index = 1
  //
  // "mit" === sortedB[1]
  //
  // "mit" === "mit" // true
  //
  // Third iteration:
  // value = "sa"
  // index = 2
  //
  // "sa" === sortedB[2]
  //
  // "sa" === "sa" // true
  //
  // Why not sortedB[value]?
  //
  // Because value is "m", "mit", "sa"
  // (not a numeric array index).
  //
  // sortedB["m"]   // undefined
  // sortedB["mit"] // undefined
  // sortedB["sa"]  // undefined
  //
  // Arrays normally use numeric indexes:
  //
  // sortedB[0]
  // sortedB[1]
  // sortedB[2]
  //
  // So:
  //
  // (value, index) => value === sortedB[index]
  //
  // means:
  // current value from A == value at the same index in B.
  return sortedA.every(
    (value, index) =>
      value === sortedB[index]
  );
}

console.log(
  "10) Arrays equal:",
  arraysEqual(
    ["Angular", "React", "Vue"],
    ["Vue", "Angular", "React"]
  )
);


// ============================================================
// 11. REUSABLE FILTER FUNCTION
// ============================================================
//
// A function that receives another function
// as an argument is called a:
//
// HIGHER-ORDER FUNCTION
//
// condition can be:
//
// user => user.active
//
// or:
//
// user => user.id === 2
//
// or:
//
// user => user.name.startsWith("S")

function filterUsers(list, condition) {
  return list.filter(condition);
}

console.log(
  "11) Filter users:",
  filterUsers(
    users,
    (user) => user.active
  )
);


// ============================================================
// 12. COUNTER USING CLOSURE
// ============================================================
//
// Closure
// -------
// A function remembers variables from
// its outer scope even after the outer
// function has finished.
//
// count belongs to createCounter().
//
// The returned function can still access it.

function createCounter() {

  let count = 0;

  return () => {

    count += 1;

    return count;
  };
}

const counter = createCounter();

console.log(
  "12) Counter:",
  counter(),
  counter(),
  counter()
);

// Result:
// 1
// 2
// 3


// ============================================================
// 13. CASE-INSENSITIVE USER SEARCH
// ============================================================
//
// Search can check multiple fields.
//
// Example:
//
// Search "ber"
//
// "Berlin"
// contains "ber"
//
// toLowerCase()
// -------------
// Makes comparison case-insensitive.
//
// includes()
// ----------
// Checks whether the search term exists.
//
// some()
// ------
// Returns true if at least ONE value matches.

const searchableUsers = [
  { name: "Sammit", city: "Berlin" },
  { name: "John", city: "Hamburg" },
  { name: "Anna", city: "Berlin" },
  { name: "Peter", city: "Munich" }
];

function searchUsers(list, searchTerm) {

  const term =
    searchTerm.toLowerCase();

  return list.filter((user) => {

    return [
      user.name,
      user.city
    ].some((value) =>
      value
        .toLowerCase()
        .includes(term)
    );

  });
}

console.log(
  "13) Search users:",
  searchUsers(
    searchableUsers,
    "ber"
  )
);


// ============================================================
// 14. PAGINATION
// ============================================================
//
// Example:
//
// page = 2
// pageSize = 2
//
// Start:
//
// (page - 1) * pageSize
//
// (2 - 1) * 2
// = 2
//
// slice(2, 4)
//
// returns indexes:
// 2 and 3
//
// Important:
// Humans normally count pages from 1,
// while arrays use indexes starting from 0.

function paginate(
  list,
  page,
  pageSize
) {

  const start =
    (page - 1) * pageSize;

  return list.slice(
    start,
    start + pageSize
  );
}

console.log(
  "14) Pagination:",
  paginate(users, 2, 2)
);


// ============================================================
// 15. ASYNC / AWAIT
// ============================================================
//
// async functions always return a Promise.
//
// await pauses execution inside the
// async function until the Promise resolves.
//
// Real-world example:
//
// API
// ↓
// response
// ↓
// response.json()
// ↓
// data
// ↓
// filter active users

async function getUsers() {

  try {

    const response =
      await fetch("/api/users");

    // fetch() does not automatically throw
    // for HTTP errors such as 404 or 500.
    //
    // Therefore check response.ok.

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    const data =
      await response.json();

    return data.filter(
      (user) => user.active
    );

  } catch (error) {

    console.error(
      "Failed to fetch users:",
      error
    );

    // Return an empty array so the caller
    // receives a predictable result.
    return [];
  }
}


// Example:
//
// getUsers().then((users) => {
//   console.log(users);
// });


// ============================================================
// 16. PROMISE.ALL
// ============================================================
//
// Suppose:
//
// getUser()
//     ↓
// user.id
//
// We MUST wait for getUser() because
// we need user.id.
//
// But after that:
//
// getOrders(user.id)
// getPayments(user.id)
//
// do NOT depend on each other.
//
// Therefore they can run in parallel.
//
// Sequential:
//
// Orders → Payments
//
// Parallel:
//
// Orders
//    \
//     → Promise.all()
//    /
// Payments

async function getUser() {
  return {
    id: 1,
    name: "Sammit"
  };
}

async function getOrders(userId) {
  return [
    {
      id: 1,
      userId,
      total: 150
    }
  ];
}

async function getPayments(userId) {
  return [
    {
      id: 1,
      userId,
      amount: 100
    }
  ];
}

async function fetchUserData() {

  // This must happen first because
  // orders/payments need user.id.
  const user =
    await getUser();

  // These two requests are independent,
  // so execute them concurrently.
  const [orders, payments] =
    await Promise.all([
      getOrders(user.id),
      getPayments(user.id)
    ]);

  return {
    user,
    orders,
    payments
  };
}


// Example:
//
// fetchUserData().then((result) => {
//   console.log(result);
// });


// ============================================================
// 17. DEBOUNCE
// ============================================================
//
// Useful for:
//
// - Search boxes
// - API calls
// - Resize events
// - Input events
//
// Problem:
//
// User types:
//
// A
// An
// Ann
// Anna
//
// Without debounce:
// 4 API calls.
//
// With debounce:
// Only the final value is processed
// after the user stops typing.
//
// clearTimeout()
// --------------
// Cancels the previous scheduled function.
//
// setTimeout()
// ------------
// Schedules the new function.

function debounce(
  fn,
  delay = 500
) {

  let timer;

  return (...args) => {

    clearTimeout(timer);

    timer = setTimeout(() => {

      fn(...args);

    }, delay);
  };
}


// Example:
//
// const search = debounce(
//   (value) => {
//     console.log("API call:", value);
//   },
//   500
// );
//
// search("A");
// search("An");
// search("Ann");
// search("Anna");
//
// Only "Anna" should eventually execute.


// ============================================================
// 18. RETRY FAILED API REQUEST
// ============================================================
//
// retry(fn, attempts)
//
// If fn() fails:
//
// Attempt 1
// Attempt 2
// Attempt 3
//
// If one succeeds:
// return the result.
//
// If all fail:
// throw the last error.

async function retry(
  fn,
  attempts = 3
) {

  let lastError;

  for (
    let attempt = 1;
    attempt <= attempts;
    attempt++
  ) {

    try {

      return await fn();

    } catch (error) {

      lastError = error;

      console.warn(
        `Attempt ${attempt} failed`
      );
    }
  }

  throw lastError;
}


// Example:
//
// retry(fetchData, 3)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });


// ============================================================
// 19. CACHE WITH MAP + CLOSURE
// ============================================================
//
// Map
// ---
// Stores key-value pairs.
//
// Cache idea:
//
// First request:
//
// getUser(1)
// → API
//
// Second request:
//
// getUser(1)
// → Cache
//
// This avoids unnecessary API calls.
//
// JSON.stringify(args)
// --------------------
// Converts function arguments into a string
// that can be used as a Map key.
//
// This example is suitable for simple
// serializable arguments.

function createCachedFunction(fn) {

  const cache = new Map();

  return async (...args) => {

    const key =
      JSON.stringify(args);

    // If the result already exists,
    // return it without calling the API.
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Otherwise call the original function.
    const result =
      await fn(...args);

    // Store the result.
    cache.set(key, result);

    return result;
  };
}


// Example:
//
// const fetchUser = async (id) => {
//
//   console.log("API call:", id);
//
//   return {
//     id,
//     name: id === 1
//       ? "Sammit"
//       : "John"
//   };
// };
//
// const getCachedUser =
//   createCachedFunction(fetchUser);
//
// await getCachedUser(1); // API
// await getCachedUser(1); // Cache
// await getCachedUser(2); // API


// ============================================================
// EMPLOYEE MANAGEMENT SYSTEM
// ============================================================

const employees = [
  {
    id: 1,
    name: "Sammit",
    department: "IT",
    salary: 60000,
    skills: [
      "JavaScript",
      "Angular"
    ],
    active: true
  },

  {
    id: 2,
    name: "John",
    department: "HR",
    salary: 45000,
    skills: [
      "Recruiting"
    ],
    active: true
  },

  {
    id: 3,
    name: "Anna",
    department: "IT",
    salary: 70000,
    skills: [
      "JavaScript",
      "React"
    ],
    active: false
  },

  {
    id: 4,
    name: "Peter",
    department: "IT",
    salary: 65000,
    skills: [
      "C#",
      ".NET"
    ],
    active: true
  }
];


// ============================================================
// 20. GET EMPLOYEE NAMES
// ============================================================
//
// map()
// transforms:
//
// employee object
//
// into:
//
// employee.name

function getEmployeeNames(list) {

  return list.map(
    (employee) =>
      employee.name
  );
}

console.log(
  "20) Employee names:",
  getEmployeeNames(employees)
);


// ============================================================
// 21. GET ACTIVE EMPLOYEES
// ============================================================

function getActiveEmployees(list) {

  return list.filter(
    (employee) =>
      employee.active
  );
}

console.log(
  "21) Active employees:",
  getActiveEmployees(employees)
);


// ============================================================
// 22. FIND EMPLOYEE BY ID
// ============================================================

function findEmployeeById(
  list,
  id
) {

  return list.find(
    (employee) =>
      employee.id === id
  );
}

console.log(
  "22) Employee id 3:",
  findEmployeeById(
    employees,
    3
  )
);


// ============================================================
// 23. GET IT EMPLOYEES
// ============================================================

function getITEmployees(list) {

  return list.filter(
    (employee) =>
      employee.department === "IT"
  );
}

console.log(
  "23) IT employees:",
  getITEmployees(employees)
);


// ============================================================
// 24. AVERAGE SALARY
// ============================================================
//
// Step 1:
// Calculate total salary.
//
// Step 2:
// Divide by number of employees.

function getAverageSalary(list) {

  const total =
    list.reduce(
      (sum, employee) =>
        sum + employee.salary,
      0
    );

  return total / list.length;
}

console.log(
  "24) Average salary:",
  getAverageSalary(employees)
);


// ============================================================
// 25. HIGHEST-PAID EMPLOYEE
// ============================================================

function getHighestPaidEmployee(list) {

  return list.reduce(
    (highest, employee) =>
      employee.salary >
      highest.salary
        ? employee
        : highest,
    list[0]
  );
}

console.log(
  "25) Highest-paid employee:",
  getHighestPaidEmployee(employees)
);


// ============================================================
// 26. EMPLOYEES WHO KNOW A SKILL
// ============================================================
//
// skills is itself an array.
//
// Therefore:
//
// employee.skills.includes(skill)
//
// checks whether the employee knows
// the requested skill.

function getEmployeesWhoKnowSkill(
  list,
  skill
) {

  return list.filter(
    (employee) =>
      employee.skills.includes(skill)
  );
}

console.log(
  "26) JavaScript employees:",
  getEmployeesWhoKnowSkill(
    employees,
    "JavaScript"
  )
);


// ============================================================
// 27. COUNT EMPLOYEES BY DEPARTMENT
// ============================================================
//
// Expected:
//
// {
//   IT: 3,
//   HR: 1
// }

function countEmployeesByDepartment(list) {

  return list.reduce(
    (groups, employee) => {

      const department =
        employee.department;

      groups[department] =
        (groups[department] || 0) + 1;

      return groups;

    },
    {}
  );
}

console.log(
  "27) Employees by department:",
  countEmployeesByDepartment(
    employees
  )
);


// ============================================================
// 28. GROUP EMPLOYEES BY DEPARTMENT
// ============================================================
//
// Difference:
//
// COUNT:
//
// IT: 3
//
// GROUP:
//
// IT: [employee1, employee3, employee4]

function groupEmployeesByDepartment(list) {

  return list.reduce(
    (groups, employee) => {

      const department =
        employee.department;

      if (!groups[department]) {
        groups[department] = [];
      }

      groups[department].push(
        employee
      );

      return groups;

    },
    {}
  );
}

console.log(
  "28) Grouped employees:",
  groupEmployeesByDepartment(
    employees
  )
);


// ============================================================
// 29. HIGHEST-PAID EMPLOYEE PER DEPARTMENT
// ============================================================
//
// Step 1:
// Group employees.
//
// Step 2:
// Loop through each department.
//
// Step 3:
// Find highest-paid employee
// inside each group.

function getHighestPaidEmployeePerDepartment(
  list
) {

  const grouped =
    groupEmployeesByDepartment(
      list
    );

  return Object.entries(
    grouped
  ).reduce(
    (result, [department, employees]) => {

      result[department] =
        getHighestPaidEmployee(
          employees
        );

      return result;

    },
    {}
  );
}

console.log(
  "29) Highest-paid per department:",
  getHighestPaidEmployeePerDepartment(
    employees
  )
);


// ============================================================
// 30. SORT ACTIVE EMPLOYEES BY SALARY
// ============================================================
//
// filter()
// --------
// Keep active employees.
//
// toSorted()
// ----------
// Return a new sorted array.
//
// b.salary - a.salary
// --------------------
// Descending order.
//
// IMPORTANT:
//
// sort()
// mutates the array.
//
// toSorted()
// does NOT mutate the original array.

function sortActiveEmployeesBySalaryDesc(
  list
) {

  return list
    .filter(
      (employee) =>
        employee.active
    )
    .toSorted(
      (a, b) =>
        b.salary - a.salary
    );
}

console.log(
  "30) Sorted active employees:",
  sortActiveEmployeesBySalaryDesc(
    employees
  )
);


// ============================================================
// 31. GET UNIQUE SKILLS
// ============================================================
//
// Each employee has an array:
//
// ["JavaScript", "Angular"]
//
// flatMap() combines all skill arrays
// into one array.
//
// Then Set removes duplicates.
//
// Then spread converts Set back to array.
//
// Pipeline:
//
// employees
//    ↓
// flatMap()
//    ↓
// Set
//    ↓
// [...]
//    ↓
// unique skills

function getUniqueSkills(list) {

  return [
    ...new Set(
      list.flatMap(
        (employee) =>
          employee.skills
      )
    )
  ];
}

console.log(
  "31) Unique skills:",
  getUniqueSkills(
    employees
  )
);


// ============================================================
// 32. TOTAL SALARY OF ACTIVE IT EMPLOYEES
// ============================================================
//
// First filter:
//
// active === true
//
// AND:
//
// department === "IT"
//
// Then reduce salary.

function getTotalSalaryOfActiveITEmployees(
  list
) {

  return list
    .filter(
      (employee) =>
        employee.active &&
        employee.department === "IT"
    )
    .reduce(
      (sum, employee) =>
        sum + employee.salary,
      0
    );
}

console.log(
  "32) Total salary of active IT employees:",
  getTotalSalaryOfActiveITEmployees(
    employees
  )
);


// ============================================================
// 33. SEARCH EMPLOYEES
// ============================================================
//
// Search:
//
// 1. name
// 2. department
// 3. skills
//
// Case-insensitive.
//
// some()
// ------
// At least ONE field must match.

function searchEmployees(
  list,
  term
) {

  const query =
    term.toLowerCase();

  return list.filter(
    (employee) => {

      return [
        employee.name,
        employee.department,
        ...employee.skills
      ].some(
        (value) =>
          value
            .toLowerCase()
            .includes(query)
      );
    }
  );
}

console.log(
  "33) Search employees:",
  searchEmployees(
    employees,
    "java"
  )
);


// ============================================================
// 34. PAGINATE EMPLOYEES
// ============================================================

function paginateEmployees(
  list,
  page,
  pageSize
) {

  const start =
    (page - 1) * pageSize;

  return list.slice(
    start,
    start + pageSize
  );
}

console.log(
  "34) Paginate employees:",
  paginateEmployees(
    employees,
    2,
    2
  )
);


// ============================================================
// 35. DEBOUNCED EMPLOYEE SEARCH
// ============================================================
//
// In a frontend application:
//
// User types:
//
// j
// ja
// jav
// java
//
// We don't want an API request
// for every character.
//
// debounce() waits until the user
// stops typing.

const debouncedEmployeeSearch =
  debounce(
    (term) => {

      console.log(
        "Employee API search:",
        term
      );

    },
    500
  );


// Example:
//
// debouncedEmployeeSearch("j");
// debouncedEmployeeSearch("ja");
// debouncedEmployeeSearch("jav");
// debouncedEmployeeSearch("java");


// ============================================================
// 36. CACHED EMPLOYEE LOOKUP
// ============================================================
//
// Cache prevents repeated API calls.
//
// First:
//
// ID 1 → API
//
// Again:
//
// ID 1 → Cache
//
// ID 2 → API

const fetchEmployee = async (id) => {

  console.log(
    "API call for employee:",
    id
  );

  return employees.find(
    (employee) =>
      employee.id === id
  );
};

const getCachedEmployee =
  createCachedFunction(
    fetchEmployee
  );


// Example:
//
// await getCachedEmployee(1);
// await getCachedEmployee(1);
// await getCachedEmployee(2);


// ============================================================
// 37. FETCH EMPLOYEES WITH RETRY
// ============================================================
//
// retry() can be combined with
// an API function.
//
// If the request fails,
// it will try again.

async function fetchEmployees() {

  const response =
    await fetch(
      "/api/employees"
    );

  if (!response.ok) {

    throw new Error(
      `HTTP ${response.status}`
    );
  }

  return response.json();
}


// Example:
//
// const data = await retry(
//   fetchEmployees,
//   3
// );


// ============================================================
// 38. PROMISE.ALL WITH EMPLOYEE DATA
// ============================================================
//
// Suppose these are independent:
//
// getDepartments()
// getSkills()
// getEmployees()
//
// They can run in parallel.
//
// Instead of:
//
// const departments =
//   await getDepartments();
//
// const skills =
//   await getSkills();
//
// const employees =
//   await getEmployees();
//
// Use:

async function loadEmployeeData() {

  const [
    departments,
    skills,
    employeeList
  ] = await Promise.all([

    getDepartments(),

    getSkills(),

    getEmployees()
  ]);

  return {
    departments,
    skills,
    employees: employeeList
  };
}


// Example placeholder functions:

async function getDepartments() {
  return ["IT", "HR"];
}

async function getSkills() {
  return [
    "JavaScript",
    "Angular",
    "React"
  ];
}

async function getEmployees() {
  return employees;
}


// ============================================================
// ANGULAR + RXJS INTERVIEW CONCEPT
// ============================================================
//
// JavaScript:
//
// debounce()
//
// Angular + RxJS:
//
// debounceTime()
//
// Example:
//
// searchControl.valueChanges
//   .pipe(
//     debounceTime(500),
//     distinctUntilChanged(),
//     switchMap(term =>
//       employeeService
//         .searchEmployees(term)
//     )
//   );
//
// IMPORTANT RXJS OPERATORS:
//
// debounceTime()
// ----------------
// Wait before emitting.
//
// distinctUntilChanged()
// ----------------------
// Ignore the value if it hasn't changed.
//
// switchMap()
// ------------
// Switch to the newest Observable.
//
// Very useful for search.
//
// Example:
//
// User types:
//
// j
// ja
// jav
// java
//
// switchMap() helps ensure that
// newer searches replace older searches.


// ============================================================
// ANGULAR SIGNALS INTERVIEW CONCEPT
// ============================================================
//
// Signals are useful for reactive state.
//
// Example:
//
// searchTerm = signal("");
//
// employees = signal([]);
//
// computed() creates derived state.
//
// Example:
//
// filteredEmployees = computed(() => {
//
//   const term =
//     searchTerm()
//       .toLowerCase()
//       .trim();
//
//   if (!term) {
//     return employees();
//   }
//
//   return employees().filter(
//     employee =>
//       employee.name
//         .toLowerCase()
//         .includes(term)
//   );
// });
//
// In the template:
//
// {{ searchTerm() }}
//
// and:
//
// @for (
//   employee of filteredEmployees();
//   track employee.id
// ) {
//   {{ employee.name }}
// }
//
// IMPORTANT INTERVIEW DIFFERENCE:
//
// Signals
// -------
// Best for reactive state,
// derived state and UI state.
//
// RxJS
// ----
// Best for asynchronous streams,
// HTTP streams, events, debounce,
// cancellation and stream composition.
//
// They are NOT simply replacements
// for each other.
//
// In modern Angular applications,
// Signals and RxJS are often used together.


// ============================================================
// QUICK CHEAT SHEET
// ============================================================
//
// filter()
// ---------
// Select elements.
//
// map()
// ------
// Transform elements.
//
// find()
// -------
// Find first matching element.
//
// some()
// -------
// Does AT LEAST ONE match?
//
// every()
// --------
// Do ALL match?
//
// includes()
// -----------
// Does this value exist?
//
// reduce()
// ---------
// Build one final result.
//
// sort()
// -------
// Sorts AND MUTATES original array.
//
// toSorted()
// ----------
// Sorts WITHOUT mutating original.
//
// flatMap()
// ----------
// map() + flat(1).
//
// Set
// ---
// Store unique values.
//
// Map
// ---
// Store key-value pairs.
//
// Object.entries()
// -----------------
// Convert object into [key, value] pairs.
//
// Object.keys()
// --------------
// Get object keys.
//
// Promise.all()
// --------------
// Run independent async operations concurrently.
//
// async / await
// --------------
// Work with Promises in readable syntax.
//
// Closure
// -------
// Function remembers variables from
// its outer scope.
//
// debounce
// --------
// Wait until activity stops.
//
// cache
// -----
// Store previous results to avoid
// repeated work/API calls.
//
// ============================================================