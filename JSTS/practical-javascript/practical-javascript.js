// ============================================================
// PRACTICAL JAVASCRIPT INTERVIEW SOLUTIONS
// ============================================================
// This project covers:
//
// 1. filter()
// 2. map()
// 3. find()
// 4. reduce()
// 5. Set
// 6. includes()
// 7. every()
// 8. closures
// 9. some()
// 10. slice()
// 11. async / await
// 12. Promises
// 13. debounce
// 14. retry logic
// 15. caching with Map
// 16. grouping
// 17. sorting
// 18. flatMap()
// 19. pagination
// 20. practical employee-data processing
// ============================================================


// ============================================================
// USERS DATA
// ============================================================

// An array containing user objects.
//
// Each object represents one user.
const users = [
  {
    id: 1,              // Unique user ID.
    name: 'Sammit',     // User name.
    active: true        // Whether the user is active.
  },
  {
    id: 2,
    name: 'John',
    active: false
  },
  {
    id: 3,
    name: 'Anna',
    active: true
  },
];


// ============================================================
// ORDERS DATA
// ============================================================

// Each object represents one order.
//
// price     = price of one item
// quantity  = number of items ordered
const orders = [
  {
    product: 'Laptop',
    price: 1000,
    quantity: 2
  },
  {
    product: 'Mouse',
    price: 50,
    quantity: 3
  },
  {
    product: 'Keyboard',
    price: 100,
    quantity: 1
  },
];


// ============================================================
// PRODUCTS DATA
// ============================================================

// Product list used to find the most expensive product.
const products = [
  {
    name: 'Laptop',
    price: 1200
  },
  {
    name: 'Phone',
    price: 800
  },
  {
    name: 'Monitor',
    price: 400
  },
  {
    name: 'Tablet',
    price: 600
  },
];


// ============================================================
// NUMBERS
// ============================================================

// This array contains duplicate numbers.
//
// 1 appears twice.
// 2 appears twice.
// 3 appears twice.
const numbers = [
  1, 2, 3, 2, 4, 1, 5, 3
];


// ============================================================
// USERS WITH AGES
// ============================================================

// Used for grouping users by age.
const ageUsers = [
  {
    name: 'Sammit',
    age: 30
  },
  {
    name: 'John',
    age: 25
  },
  {
    name: 'Anna',
    age: 30
  },
  {
    name: 'Peter',
    age: 25
  },
];


// ============================================================
// FRONTEND / BACKEND SKILLS
// ============================================================

const frontend = [
  'Angular',
  'React',
  'Vue',
  'JavaScript'
];

const backend = [
  'Node.js',
  'JavaScript',
  'C#',
  'Angular'
];


// ============================================================
// EMPLOYEE DATA
// ============================================================

// More realistic data for interview exercises.
//
// Each employee has:
//
// id
// name
// department
// salary
// skills
// active
const employeeUsers = [
  {
    id: 1,
    name: 'Sammit',
    department: 'IT',
    salary: 60000,
    skills: [
      'JavaScript',
      'Angular'
    ],
    active: true
  },

  {
    id: 2,
    name: 'John',
    department: 'HR',
    salary: 45000,
    skills: [
      'Recruiting'
    ],
    active: true
  },

  {
    id: 3,
    name: 'Anna',
    department: 'IT',
    salary: 70000,
    skills: [
      'JavaScript',
      'React'
    ],
    active: false
  },

  {
    id: 4,
    name: 'Peter',
    department: 'IT',
    salary: 65000,
    skills: [
      'C#',
      '.NET'
    ],
    active: true
  },
];


// ============================================================
// 1. GET ACTIVE USERS
// ============================================================

// filter() creates a NEW array.
//
// It keeps only elements for which
// the callback returns true.
//
// user => user.active
//
// means:
//
// "Keep the user if active is true."
function getActiveUsers(list) {

  return list.filter(
    (user) => user.active
  );
}


// Result:
//
// [
//   { id: 1, name: 'Sammit', active: true },
//   { id: 3, name: 'Anna', active: true }
// ]


// ============================================================
// 2. GET USER NAMES
// ============================================================

// map() transforms every element.
//
// We have:
//
// user object
//
// and return:
//
// user.name
//
// So:
//
// [
//   { name: 'Sammit' },
//   { name: 'John' }
// ]
//
// becomes:
//
// [
//   'Sammit',
//   'John'
// ]
function getUserNames(list) {

  return list.map(
    (user) => user.name
  );
}


// ============================================================
// 3. FIND USER BY ID
// ============================================================

// find() returns the FIRST element
// that satisfies the condition.
//
// If no element matches,
// find() returns undefined.
function findUserById(list, id) {

  return list.find(
    (user) => user.id === id
  );
}


// ============================================================
// 4. CALCULATE TOTAL ORDER PRICE
// ============================================================

// reduce() is used when we want
// to combine many values into one result.
//
// Each order has:
//
// price
// quantity
//
// Total for an order:
//
// price * quantity
//
// Example:
//
// Laptop:
// 1000 * 2 = 2000
//
// Mouse:
// 50 * 3 = 150
//
// Keyboard:
// 100 * 1 = 100
//
// Total:
//
// 2250
function getTotalOrderPrice(list) {

  return list.reduce(

    // total = accumulator
    // order = current order
    (total, order) => {

      return total +
        order.price * order.quantity;

    },

    // Initial value of total.
    0
  );
}


// ============================================================
// 5. FIND MOST EXPENSIVE PRODUCT
// ============================================================

// reduce() can also find
// the maximum object.
//
// max = currently most expensive product.
// item = current product.
//
// If current item is more expensive,
// return item.
//
// Otherwise return max.
function getMostExpensiveProduct(list) {

  return list.reduce(
    (max, item) => {

      return item.price > max.price
        ? item
        : max;

    },

    // Start with the first product.
    list[0]
  );
}


// ============================================================
// 6. REMOVE DUPLICATES WITHOUT SET
// ============================================================

// This demonstrates how to remove
// duplicates manually.
//
// We create an empty array.
//
// Then inspect every value.
//
// If the value is not already inside
// unique[], we add it.
function removeDuplicatesWithoutSet(list) {

  const unique = [];

  for (const value of list) {

    // includes() checks whether
    // the value already exists.
    if (!unique.includes(value)) {

      unique.push(value);
    }
  }

  return unique;
}


// Example:
//
// [1,2,3,2,4,1]
//
// becomes:
//
// [1,2,3,4]


// ============================================================
// 7. REMOVE DUPLICATES WITH SET
// ============================================================

// Set automatically stores UNIQUE values.
//
// Example:
//
// new Set([1,2,2,3])
//
// becomes:
//
// Set {1,2,3}
//
// [...]
// converts the Set back into an array.
function removeDuplicatesWithSet(list) {

  return [
    ...new Set(list)
  ];
}


// ============================================================
// 8. GROUP USERS BY AGE
// ============================================================

// reduce() is used to create
// an object containing groups.
//
// Expected result:
//
// {
//   25: ['John', 'Peter'],
//   30: ['Sammit', 'Anna']
// }
function groupUsersByAge(list) {

  return list.reduce(

    (groups, user) => {

      // The user's age becomes the object key.
      const key = user.age;

      // If this age does not exist,
      // create an empty array.
      if (!groups[key]) {

        groups[key] = [];
      }

      // Add the user's name
      // to the correct age group.
      groups[key].push(user.name);

      // Return accumulator.
      return groups;

    },

    // Start with an empty object.
    {}
  );
}


// ============================================================
// 9. FIND COMMON ITEMS
// ============================================================

// filter() keeps items from array A
// that also exist in array B.
//
// includes() checks whether B contains
// the current item.
function findCommonItems(a, b) {

  return a.filter(
    (item) => b.includes(item)
  );
}


// frontend:
//
// ['Angular', 'React', 'Vue', 'JavaScript']
//
// backend:
//
// ['Node.js', 'JavaScript', 'C#', 'Angular']
//
// Result:
//
// ['Angular', 'JavaScript']


// ============================================================
// 10. CHECK WHETHER TWO ARRAYS ARE EQUAL
// ============================================================

// First check array lengths.
//
// If lengths differ,
// arrays cannot be equal.
function arraysEqual(a, b) {

  if (a.length !== b.length) {

    return false;
  }

  // every() returns true only when
  // ALL elements satisfy the condition.
  //
  // Compare each value at the same index.
  return a.every(
    (value, index) =>
      value === b[index]
  );
}


// Important:
//
// This checks:
//
// [1,2,3] === [1,2,3]
//
// based on values and positions.
//
// It does NOT treat:
//
// [1,2,3]
//
// and:
//
// [3,2,1]
//
// as equal.


// ============================================================
// 11. GENERIC FILTER FUNCTION
// ============================================================

// This function accepts a condition
// as another function.
//
// This is called a CALLBACK.
//
// Example:
//
// filterUsers(
//   users,
//   user => user.active
// );
//
// The condition is passed into filter().
function filterUsers(list, condition) {

  return list.filter(condition);
}


// ============================================================
// 12. CLOSURE / COUNTER
// ============================================================

// createCounter() creates a private variable:
//
// count
//
// The returned function remembers
// that variable even after createCounter()
// has finished executing.
//
// This is called a CLOSURE.
function createCounter() {

  // Private variable.
  let count = 0;

  // Return a function.
  return () => {

    // Increase count.
    count += 1;

    // Return current count.
    return count;
  };
}


// Example:
//
// const counter = createCounter();
//
// counter() -> 1
// counter() -> 2
// counter() -> 3
//
// count remains available because
// of the closure.


// ============================================================
// 13. SEARCH USERS
// ============================================================

// Search by:
//
// name
// city
//
// The search should be case-insensitive.
function searchUsers(list, searchTerm) {

  // Convert search text to lowercase.
  const term = searchTerm.toLowerCase();

  return list.filter(
    (user) => {

      // Create an array containing
      // searchable fields.
      //
      // ?? '' protects against undefined.
      //
      // If city does not exist,
      // use an empty string.
      return [
        user.name,
        user.city ?? ''
      ].some(

        // some() returns true when
        // at least ONE value matches.
        (value) =>
          value
            .toLowerCase()
            .includes(term)
      );
    }
  );
}


// ============================================================
// 14. PAGINATION
// ============================================================

// Pagination means returning only
// one portion/page of the data.
//
// page = page number
// pageSize = number of items per page
//
// Example:
//
// page = 2
// pageSize = 2
//
// start:
//
// (2 - 1) * 2
// = 2
//
// slice(2,4)
//
// returns indexes 2 and 3.
function paginate(list, page, pageSize) {

  const start =
    (page - 1) * pageSize;

  return list.slice(
    start,
    start + pageSize
  );
}


// ============================================================
// 15. ASYNC / AWAIT
// ============================================================

// async means this function
// returns a Promise.
async function getUsers() {

  try {

    // Simulated HTTP response.
    //
    // In a real application this could be:
    //
    // const response = await fetch('/api/users');
    const response = {

      // json() is simulated here.
      json: async () => [
        {
          id: 1,
          name: 'Sammit',
          active: true
        },
        {
          id: 2,
          name: 'John',
          active: false
        },
        {
          id: 3,
          name: 'Anna',
          active: true
        },
      ],
    };

    // await waits for the Promise
    // returned by response.json().
    const data = await response.json();

    // Return only active users.
    return data.filter(
      (user) => user.active
    );

  } catch (error) {

    // Handle errors.
    console.error(
      'Failed to fetch users:',
      error
    );

    // Return empty array if request fails.
    return [];
  }
}


// ============================================================
// 16. SIMULATED API FUNCTIONS
// ============================================================

// async functions automatically
// return Promises.
async function getUser() {

  return {
    id: 1,
    name: 'Sammit'
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


// ============================================================
// 17. SEQUENTIAL ASYNC OPERATIONS
// ============================================================

// Here each request waits for
// the previous request.
//
// Step 1:
//
// getUser()
//
// Step 2:
//
// getOrders(user.id)
//
// Step 3:
//
// getPayments(user.id)
async function fetchUserDataSequentially() {

  // Wait for user.
  const user = await getUser();

  // Need user.id before getting orders.
  const ordersList =
    await getOrders(user.id);

  // Need user.id before getting payments.
  const paymentsList =
    await getPayments(user.id);

  // Return one combined object.
  return {
    user,
    orders: ordersList,
    payments: paymentsList
  };
}


// ============================================================
// 18. DEBOUNCE
// ============================================================

// Debounce delays function execution.
//
// Very common for:
//
// search boxes
// autocomplete
// API calls
//
// If the function is called repeatedly,
// the timer is reset.
//
// Only after the user stops calling
// the function for "delay" milliseconds
// will fn execute.
function debounce(fn, delay = 500) {

  // Stores the timer ID.
  let timer;

  // Return a new function.
  return (...args) => {

    // Cancel previous timer.
    clearTimeout(timer);

    // Create a new timer.
    timer = setTimeout(

      // Execute original function.
      () => fn(...args),

      // Wait this long.
      delay
    );
  };
}


// ============================================================
// 19. RETRY
// ============================================================

// retry() executes an async function
// multiple times if it fails.
//
// attempts = maximum number of tries.
async function retry(fn, attempts = 3) {

  // Store the final error.
  let lastError;

  // Loop through attempts.
  for (
    let attempt = 1;
    attempt <= attempts;
    attempt += 1
  ) {

    try {

      // Try executing the function.
      return await fn();

    } catch (error) {

      // Save the error.
      lastError = error;

      console.warn(
        `Attempt ${attempt} failed`
      );
    }
  }

  // If every attempt failed,
  // throw the final error.
  throw lastError;
}


// ============================================================
// 20. CACHE FUNCTION
// ============================================================

// Caching means storing previous results
// so we don't have to perform the same
// expensive operation again.
//
// Map is useful for caching.
function createCachedFunction(fn) {

  // Stores:
//
// key -> result
  const cache = new Map();

  // Return a new async function.
  return async (...args) => {

    // Convert arguments into
    // a string that can be used as a key.
    const key =
      JSON.stringify(args);

    // Check whether result
    // already exists in cache.
    if (cache.has(key)) {

      // Return cached result.
      return cache.get(key);
    }

    // Execute original function
    // because result isn't cached.
    const result =
      await fn(...args);

    // Store result.
    cache.set(key, result);

    // Return result.
    return result;
  };
}


// ============================================================
// EMPLOYEE SECTION
// ============================================================


// ============================================================
// 21. GET EMPLOYEE NAMES
// ============================================================

// map() transforms:
//
// employee object
//
// into:
//
// employee.name
function getEmployeeNames(list) {

  return list.map(
    (employee) => employee.name
  );
}


// ============================================================
// 22. GET ACTIVE EMPLOYEES
// ============================================================

// Keep only active employees.
function getActiveEmployees(list) {

  return list.filter(
    (employee) => employee.active
  );
}


// ============================================================
// 23. FIND EMPLOYEE BY ID
// ============================================================

// find() returns the first matching employee.
function findEmployeeById(list, id) {

  return list.find(
    (employee) => employee.id === id
  );
}


// ============================================================
// 24. GET IT EMPLOYEES
// ============================================================

// Filter employees whose department
// is exactly "IT".
function getITEmployees(list) {

  return list.filter(
    (employee) =>
      employee.department === 'IT'
  );
}


// ============================================================
// 25. AVERAGE SALARY
// ============================================================

// First calculate total salary.
//
// Then divide by number of employees.
function getAverageSalary(list) {

  const total =
    list.reduce(
      (sum, employee) =>
        sum + employee.salary,
      0
    );

  return total / list.length;
}


// ============================================================
// 26. HIGHEST-PAID EMPLOYEE
// ============================================================

// reduce() compares salaries
// and keeps the highest-paid employee.
function getHighestPaidEmployee(list) {

  return list.reduce(
    (highest, employee) =>
      employee.salary > highest.salary
        ? employee
        : highest,

    // Initial value.
    list[0]
  );
}


// ============================================================
// 27. EMPLOYEES WHO KNOW A SKILL
// ============================================================

// skills is an array.
//
// includes() checks whether
// the requested skill exists.
function getEmployeesWhoKnowSkill(
  list,
  skill
) {

  return list.filter(
    (employee) =>
      employee.skills.includes(skill)
  );
}


// ============================================================
// 28. COUNT EMPLOYEES BY DEPARTMENT
// ============================================================

// Create:
//
// {
//   IT: 3,
//   HR: 1
// }
function countEmployeesByDepartment(list) {

  return list.reduce(
    (groups, employee) => {

      // If department doesn't exist,
      // start with 0.
      groups[employee.department] =
        (groups[employee.department] || 0) + 1;

      return groups;

    },
    {}
  );
}


// ============================================================
// 29. GROUP EMPLOYEES BY DEPARTMENT
// ============================================================

// Instead of counting employees,
// store the actual employee objects
// inside each department.
function groupEmployeesByDepartment(list) {

  return list.reduce(
    (groups, employee) => {

      // Create an empty array
      // if department doesn't exist.
      if (!groups[employee.department]) {

        groups[employee.department] = [];
      }

      // Add employee to department.
      groups[employee.department].push(
        employee
      );

      return groups;

    },
    {}
  );
}


// Result:
//
// {
//   IT: [
//     Sammit,
//     Anna,
//     Peter
//   ],
//   HR: [
//     John
//   ]
// }


// ============================================================
// 30. HIGHEST-PAID EMPLOYEE PER DEPARTMENT
// ============================================================

// First group employees:
//
// IT -> [Sammit, Anna, Peter]
// HR -> [John]
//
// Then find highest-paid employee
// inside each group.
function getHighestPaidEmployeePerDepartment(
  list
) {

  return Object.entries(
    groupEmployeesByDepartment(list)
  ).reduce(

    (result, [department, employees]) => {

      // Find highest-paid employee
      // for this department.
      result[department] =
        getHighestPaidEmployee(employees);

      return result;
    },

    {}
  );
}


// ============================================================
// 31. SORT ACTIVE EMPLOYEES BY SALARY
// ============================================================

// Step 1:
//
// filter active employees.
//
// Step 2:
//
// sort by salary descending.
//
// b.salary - a.salary
//
// means:
//
// highest salary first.
function sortActiveEmployeesBySalaryDesc(list) {

  return list

    .filter(
      (employee) => employee.active
    )

    .sort(
      (a, b) =>
        b.salary - a.salary
    );
}


// IMPORTANT:
//
// sort() MUTATES the array.
//
// If you don't want mutation:
//
// return [...list]
//   .filter(...)
//   .toSorted(...);


// ============================================================
// 32. GET UNIQUE SKILLS
// ============================================================

// Every employee has a skills array.
//
// flatMap() first creates one flat array.
//
// Example:
//
// [
//   ['JavaScript', 'Angular'],
//   ['Recruiting'],
//   ['JavaScript', 'React']
// ]
//
// becomes:
//
// [
//   'JavaScript',
//   'Angular',
//   'Recruiting',
//   'JavaScript',
//   'React'
// ]
//
// Then Set removes duplicates.
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


// ============================================================
// 33. TOTAL SALARY OF ACTIVE IT EMPLOYEES
// ============================================================

// First filter employees where:
//
// active === true
//
// AND:
//
// department === 'IT'
//
// Then reduce() their salaries.
function getTotalSalaryOfActiveITEmployees(
  list
) {

  return list

    .filter(
      (employee) =>
        employee.active &&
        employee.department === 'IT'
    )

    .reduce(
      (sum, employee) =>
        sum + employee.salary,
      0
    );
}


// ============================================================
// 34. SEARCH EMPLOYEES
// ============================================================

// Search across:
//
// name
// department
// skills
//
// some() means:
//
// "Does at least one field match?"
function searchEmployees(list, term) {

  // Normalize search term.
  const query =
    term.toLowerCase();

  return list.filter(
    (employee) => {

      // Create searchable values.
      const values = [
        employee.name,
        employee.department,
        ...employee.skills
      ];

      // Check whether any value contains
      // the search term.
      return values.some(
        (value) =>
          value
            .toLowerCase()
            .includes(query)
      );
    }
  );
}


// ============================================================
// 35. EMPLOYEE PAGINATION
// ============================================================

// Same pagination concept
// as the earlier users example.
function paginateEmployees(
  list,
  page,
  pageSize
) {

  // Calculate starting index.
  const start =
    (page - 1) * pageSize;

  // Return only the requested page.
  return list.slice(
    start,
    start + pageSize
  );
}


// ============================================================
// RUN THE INTERVIEW EXAMPLES
// ============================================================


// ------------------------------------------------------------
// 1. FILTER
// ------------------------------------------------------------

console.log(
  '1) Active users:',
  getActiveUsers(users)
);


// ------------------------------------------------------------
// 2. MAP
// ------------------------------------------------------------

console.log(
  '2) User names:',
  getUserNames(users)
);


// ------------------------------------------------------------
// 3. FIND
// ------------------------------------------------------------

console.log(
  '3) User with id 2:',
  findUserById(users, 2)
);


// ------------------------------------------------------------
// 4. REDUCE
// ------------------------------------------------------------

console.log(
  '4) Total order price:',
  getTotalOrderPrice(orders)
);


// Result:
//
// 1000 * 2 = 2000
// 50 * 3   = 150
// 100 * 1  = 100
//
// Total = 2250


// ------------------------------------------------------------
// 5. MAXIMUM
// ------------------------------------------------------------

console.log(
  '5) Most expensive product:',
  getMostExpensiveProduct(products).name
);


// ------------------------------------------------------------
// 6. DUPLICATES WITHOUT SET
// ------------------------------------------------------------

console.log(
  '6) Remove duplicates without Set:',
  removeDuplicatesWithoutSet(numbers)
);


// ------------------------------------------------------------
// 7. DUPLICATES WITH SET
// ------------------------------------------------------------

console.log(
  '7) Remove duplicates with Set:',
  removeDuplicatesWithSet(numbers)
);


// ------------------------------------------------------------
// 8. GROUP BY AGE
// ------------------------------------------------------------

console.log(
  '8) Group users by age:',
  groupUsersByAge(ageUsers)
);


// ------------------------------------------------------------
// 9. COMMON ITEMS
// ------------------------------------------------------------

console.log(
  '9) Common items:',
  findCommonItems(
    frontend,
    backend
  )
);


// Result:
//
// ['Angular', 'JavaScript']


// ------------------------------------------------------------
// 10. ARRAY COMPARISON
// ------------------------------------------------------------

console.log(
  '10) Arrays equal:',
  arraysEqual(
    ['Angular', 'React', 'Vue'],
    ['Vue', 'Angular', 'React']
  )
);


// false
//
// Because order is different.


// ------------------------------------------------------------
// DIFFERENT ARRAY LENGTH
// ------------------------------------------------------------

console.log(
  '10) Arrays equal (different length):',
  arraysEqual(
    ['Angular', 'React'],
    ['Angular', 'React', 'Vue']
  )
);


// false


// ------------------------------------------------------------
// 11. CALLBACK FUNCTION
// ------------------------------------------------------------

console.log(
  '11) Filter users:',
  filterUsers(
    users,
    (user) => user.active
  )
);


// ------------------------------------------------------------
// 12. CLOSURE / COUNTER
// ------------------------------------------------------------

const counter =
  createCounter();

console.log(
  '12) Counter:',
  counter(),
  counter(),
  counter()
);


// Output:
//
// 1
// 2
// 3
//
// The function remembers count
// because of closure.


// ------------------------------------------------------------
// 13. SEARCH
// ------------------------------------------------------------

console.log(
  '13) Search users:',
  searchUsers(
    [
      {
        name: 'Sammit',
        city: 'Berlin'
      },
      {
        name: 'John',
        city: 'Hamburg'
      },
      {
        name: 'Anna',
        city: 'Berlin'
      },
      {
        name: 'Peter',
        city: 'Munich'
      },
    ],
    'ber'
  )
);


// Matches users whose city contains "ber":
//
// Berlin
//
// Result:
//
// Sammit
// Anna


// ------------------------------------------------------------
// 14. PAGINATION
// ------------------------------------------------------------

console.log(
  '14) Pagination:',
  paginate(
    users,
    2,
    2
  )
);


// Page 2 with pageSize 2:
//
// start = (2 - 1) * 2
//       = 2
//
// slice(2,4)
//
// Returns the third user onward.


// ============================================================
// ASYNC EXAMPLES
// ============================================================


// ------------------------------------------------------------
// 15. GET ACTIVE USERS FROM API
// ------------------------------------------------------------

// getUsers() returns a Promise.
//
// .then() executes when the Promise
// successfully resolves.
getUsers()
  .then(
    (activeUsers) => {

      console.log(
        '15) Active users from API:',
        activeUsers
      );
    }
  );


// ------------------------------------------------------------
// 16. SEQUENTIAL API CALLS
// ------------------------------------------------------------

fetchUserDataSequentially()
  .then(
    (result) => {

      console.log(
        '16) Sequential API result:',
        result
      );
    }
  );


// ============================================================
// DEBOUNCE EXAMPLE
// ============================================================


// Create a debounced function.
//
// It waits 500ms before executing.
const search =
  debounce(
    (value) => {

      console.log(
        '17) Debounced API call:',
        value
      );

    },
    500
  );


// These calls happen very quickly.
search('A');
search('An');
search('Ann');
search('Anna');


// Because each call resets the timer,
// only the final call:
//
// search('Anna')
//
// will normally execute after 500ms.
//
// This is very useful for:
//
// search input
// autocomplete
// API requests


// ============================================================
// RETRY EXAMPLE
// ============================================================

retry(
  async () => {

    // Simulate failure.
    throw new Error('Failed');

  },
  3
)
.catch(
  (error) => {

    console.log(
      '18) Retry failed:',
      error.message
    );
  }
);


// The function is attempted:
//
// Attempt 1
// Attempt 2
// Attempt 3
//
// If all fail,
// the final error is thrown.


// ============================================================
// CACHE EXAMPLE
// ============================================================


// Simulated API function.
const fetchUserById =
  async (id) => {

    // This message lets us see
    // whether the API is actually called.
    console.log(
      'API call for user',
      id
    );

    return {
      id,

      // Simple example:
      //
      // id 1 -> Sammit
      // other -> John
      name:
        id === 1
          ? 'Sammit'
          : 'John'
    };
  };


// Wrap API function with caching.
const getCachedUser =
  createCachedFunction(
    fetchUserById
  );


// First call:
//
// No cached result.
//
// Therefore API is called.
getCachedUser(1)
  .then(
    (user) => {

      console.log(
        '19) Cached user 1:',
        user
      );
    }
  );


// Second call with same ID.
//
// Result should come from cache.
//
// API does not need to run again.
getCachedUser(1)
  .then(
    (user) => {

      console.log(
        '19) Cached user 1 again:',
        user
      );
    }
  );


// Different ID.
//
// No cache entry for ID 2,
// so API is called.
getCachedUser(2)
  .then(
    (user) => {

      console.log(
        '19) Cached user 2:',
        user
      );
    }
  );


// ============================================================
// EMPLOYEE INTERVIEW QUESTIONS
// ============================================================


// ------------------------------------------------------------
// 20. EMPLOYEE NAMES
// ------------------------------------------------------------

console.log(
  '20) Employee names:',
  getEmployeeNames(employeeUsers)
);


// ------------------------------------------------------------
// 21. ACTIVE EMPLOYEES
// ------------------------------------------------------------

console.log(
  '21) Active employees:',
  getActiveEmployees(employeeUsers)
);


// ------------------------------------------------------------
// 22. FIND EMPLOYEE
// ------------------------------------------------------------

console.log(
  '22) Employee id 3:',
  findEmployeeById(
    employeeUsers,
    3
  )
);


// ------------------------------------------------------------
// 23. IT EMPLOYEES
// ------------------------------------------------------------

console.log(
  '23) IT employees:',
  getITEmployees(employeeUsers)
);


// ------------------------------------------------------------
// 24. AVERAGE SALARY
// ------------------------------------------------------------

console.log(
  '24) Average salary:',
  getAverageSalary(employeeUsers)
);


// Salary:
//
// 60000
// 45000
// 70000
// 65000
//
// Total:
//
// 240000
//
// Average:
//
// 240000 / 4
// = 60000


// ------------------------------------------------------------
// 25. HIGHEST-PAID EMPLOYEE
// ------------------------------------------------------------

console.log(
  '25) Highest-paid employee:',
  getHighestPaidEmployee(
    employeeUsers
  ).name
);


// Anna = 70000
//
// Therefore:
//
// Anna


// ------------------------------------------------------------
// 26. EMPLOYEES WITH JAVASCRIPT SKILL
// ------------------------------------------------------------

console.log(
  '26) Employees who know JavaScript:',
  getEmployeesWhoKnowSkill(
    employeeUsers,
    'JavaScript'
  )
);


// ------------------------------------------------------------
// 27. COUNT BY DEPARTMENT
// ------------------------------------------------------------

console.log(
  '27) Employees by department:',
  countEmployeesByDepartment(
    employeeUsers
  )
);


// Result:
//
// {
//   IT: 3,
//   HR: 1
// }


// ------------------------------------------------------------
// 28. GROUP BY DEPARTMENT
// ------------------------------------------------------------

console.log(
  '28) Employees grouped by department:',
  groupEmployeesByDepartment(
    employeeUsers
  )
);


// ------------------------------------------------------------
// 29. HIGHEST PAID PER DEPARTMENT
// ------------------------------------------------------------

console.log(
  '29) Highest-paid by department:',
  getHighestPaidEmployeePerDepartment(
    employeeUsers
  )
);


// Result:
//
// IT -> Anna (70000)
// HR -> John (45000)


// ------------------------------------------------------------
// 30. SORT ACTIVE EMPLOYEES
// ------------------------------------------------------------

console.log(
  '30) Sorted active employees:',
  sortActiveEmployeesBySalaryDesc(
    employeeUsers
  )
);


// Active employees:
//
// Sammit -> 60000
// John   -> 45000
// Peter  -> 65000
//
// Sorted descending:
//
// Peter  -> 65000
// Sammit -> 60000
// John   -> 45000


// ------------------------------------------------------------
// 31. UNIQUE SKILLS
// ------------------------------------------------------------

console.log(
  '31) Unique skills:',
  getUniqueSkills(
    employeeUsers
  )
);


// Set removes duplicate:
//
// JavaScript
//
// even though multiple employees
// have this skill.


// ------------------------------------------------------------
// 32. TOTAL SALARY OF ACTIVE IT
// ------------------------------------------------------------

console.log(
  '32) Total salary of active IT employees:',
  getTotalSalaryOfActiveITEmployees(
    employeeUsers
  )
);


// Active + IT:
//
// Sammit -> 60000
// Peter  -> 65000
//
// Total:
//
// 125000


// ------------------------------------------------------------
// 33. SEARCH EMPLOYEES
// ------------------------------------------------------------

console.log(
  '33) Search employees:',
  searchEmployees(
    employeeUsers,
    'java'
  )
);


// "java" matches:
//
// JavaScript
//
// Therefore Sammit and Anna
// are returned.


// ------------------------------------------------------------
// 34. EMPLOYEE PAGINATION
// ------------------------------------------------------------

console.log(
  '34) Paginate employees:',
  paginateEmployees(
    employeeUsers,
    2,
    2
  )
);


// Page 2:
//
// pageSize = 2
//
// start = (2 - 1) * 2
//       = 2
//
// slice(2,4)
//
// Returns employees at indexes:
//
// 2
// 3