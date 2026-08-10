// Practical JavaScript interview solutions in TypeScript

interface User {
  id: number;
  name: string;
  active?: boolean;
  city?: string;
  age?: number;
}

interface Order {
  product: string;
  price: number;
  quantity: number;
}

interface Product {
  name: string;
  price: number;
}

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  skills: string[];
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Sammit', active: true },
  { id: 2, name: 'John', active: false },
  { id: 3, name: 'Anna', active: true },
];

const orders: Order[] = [
  { product: 'Laptop', price: 1000, quantity: 2 },
  { product: 'Mouse', price: 50, quantity: 3 },
  { product: 'Keyboard', price: 100, quantity: 1 },
];

const products: Product[] = [
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 800 },
  { name: 'Monitor', price: 400 },
  { name: 'Tablet', price: 600 },
];

const numbers: number[] = [1, 2, 3, 2, 4, 1, 5, 3];

const ageUsers: User[] = [
  { name: 'Sammit', age: 30 },
  { name: 'John', age: 25 },
  { name: 'Anna', age: 30 },
  { name: 'Peter', age: 25 },
];

const frontend: string[] = ['Angular', 'React', 'Vue', 'JavaScript'];
const backend: string[] = ['Node.js', 'JavaScript', 'C#', 'Angular'];

const employeeUsers: Employee[] = [
  { id: 1, name: 'Sammit', department: 'IT', salary: 60000, skills: ['JavaScript', 'Angular'], active: true },
  { id: 2, name: 'John', department: 'HR', salary: 45000, skills: ['Recruiting'], active: true },
  { id: 3, name: 'Anna', department: 'IT', salary: 70000, skills: ['JavaScript', 'React'], active: false },
  { id: 4, name: 'Peter', department: 'IT', salary: 65000, skills: ['C#', '.NET'], active: true },
];

function getActiveUsers(list: User[]): User[] {
  return list.filter((user) => user.active);
}

function getUserNames(list: User[]): string[] {
  return list.map((user) => user.name);
}

function findUserById(list: User[], id: number): User | undefined {
  return list.find((user) => user.id === id);
}

function getTotalOrderPrice(list: Order[]): number {
  return list.reduce((total, order) => total + order.price * order.quantity, 0);
}

function getMostExpensiveProduct(list: Product[]): Product {
  return list.reduce((max, item) => (item.price > max.price ? item : max), list[0]);
}

function removeDuplicatesWithoutSet(list: number[]): number[] {
  const unique: number[] = [];
  for (const value of list) {
    if (!unique.includes(value)) {
      unique.push(value);
    }
  }
  return unique;
}

function removeDuplicatesWithSet(list: number[]): number[] {
  return [...new Set(list)];
}

function groupUsersByAge(list: User[]): Record<string, string[]> {
  return list.reduce<Record<string, string[]>>((groups, user) => {
    const key = user.age?.toString() ?? 'unknown';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(user.name);
    return groups;
  }, {});
}

function findCommonItems(a: string[], b: string[]): string[] {
  return a.filter((item) => b.includes(item));
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function filterUsers(list: User[], condition: (user: User) => boolean): User[] {
  return list.filter(condition);
}

function createCounter(): () => number {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}

function searchUsers(list: User[], searchTerm: string): User[] {
  const term = searchTerm.toLowerCase();
  return list.filter((user) => {
    return [user.name, user.city].some((value) => value?.toLowerCase().includes(term));
  });
}

function paginate<T>(list: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

async function getUsers(): Promise<User[]> {
  try {
    const response = {
      json: async () => [
        { id: 1, name: 'Sammit', active: true },
        { id: 2, name: 'John', active: false },
        { id: 3, name: 'Anna', active: true },
      ],
    };

    const data: User[] = await response.json();
    return data.filter((user) => user.active);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

async function getUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: 'Sammit' };
}

async function getOrders(userId: number): Promise<Array<{ id: number; userId: number; total: number }>> {
  return [{ id: 1, userId, total: 150 }];
}

async function getPayments(userId: number): Promise<Array<{ id: number; userId: number; amount: number }>> {
  return [{ id: 1, userId, amount: 100 }];
}

async function fetchUserDataSequentially(): Promise<{ user: { id: number; name: string }; orders: Array<{ id: number; userId: number; total: number }>; payments: Array<{ id: number; userId: number; amount: number }> }> {
  const user = await getUser();
  const ordersList = await getOrders(user.id);
  const paymentsList = await getPayments(user.id);
  return { user, orders: ordersList, payments: paymentsList };
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 500): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
}

async function retry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed`);
    }
  }
  throw lastError;
}

function createCachedFunction<T, R>(fn: (value: T) => Promise<R>): (value: T) => Promise<R> {
  const cache = new Map<T, R>();
  return async (value: T) => {
    if (cache.has(value)) {
      return cache.get(value)!;
    }
    const result = await fn(value);
    cache.set(value, result);
    return result;
  };
}

function getEmployeeNames(list: Employee[]): string[] {
  return list.map((employee) => employee.name);
}

function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.active);
}

function findEmployeeById(list: Employee[], id: number): Employee | undefined {
  return list.find((employee) => employee.id === id);
}

function getITEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.department === 'IT');
}

function getAverageSalary(list: Employee[]): number {
  const total = list.reduce((sum, employee) => sum + employee.salary, 0);
  return total / list.length;
}

function getHighestPaidEmployee(list: Employee[]): Employee {
  return list.reduce((highest, employee) => (employee.salary > highest.salary ? employee : highest), list[0]);
}

function getEmployeesWhoKnowSkill(list: Employee[], skill: string): Employee[] {
  return list.filter((employee) => employee.skills.includes(skill));
}

function countEmployeesByDepartment(list: Employee[]): Record<string, number> {
  return list.reduce<Record<string, number>>((groups, employee) => {
    groups[employee.department] = (groups[employee.department] || 0) + 1;
    return groups;
  }, {});
}

function groupEmployeesByDepartment(list: Employee[]): Record<string, Employee[]> {
  return list.reduce<Record<string, Employee[]>>((groups, employee) => {
    if (!groups[employee.department]) {
      groups[employee.department] = [];
    }
    groups[employee.department].push(employee);
    return groups;
  }, {});
}

function getHighestPaidEmployeePerDepartment(list: Employee[]): Record<string, Employee> {
  return Object.entries(groupEmployeesByDepartment(list)).reduce<Record<string, Employee>>((result, [department, employees]) => {
    result[department] = getHighestPaidEmployee(employees);
    return result;
  }, {});
}

function sortActiveEmployeesBySalaryDesc(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.active).sort((a, b) => b.salary - a.salary);
}

function getUniqueSkills(list: Employee[]): string[] {
  return [...new Set(list.flatMap((employee) => employee.skills))];
}

function getTotalSalaryOfActiveITEmployees(list: Employee[]): number {
  return list.filter((employee) => employee.active && employee.department === 'IT').reduce((sum, employee) => sum + employee.salary, 0);
}

function searchEmployees(list: Employee[], term: string): Employee[] {
  const query = term.toLowerCase();
  return list.filter((employee) => {
    return [employee.name, employee.department, ...employee.skills].some((value) => value.toLowerCase().includes(query));
  });
}

function paginateEmployees(list: Employee[], page: number, pageSize: number): Employee[] {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

console.log('1) Active users:', getActiveUsers(users));
console.log('2) User names:', getUserNames(users));
console.log('3) User with id 2:', findUserById(users, 2));
console.log('4) Total order price:', getTotalOrderPrice(orders));
console.log('5) Most expensive product:', getMostExpensiveProduct(products).name);
console.log('6) Remove duplicates without Set:', removeDuplicatesWithoutSet(numbers));
console.log('6) Remove duplicates with Set:', removeDuplicatesWithSet(numbers));
console.log('7) Group users by age:', groupUsersByAge(ageUsers));
console.log('8) Common items:', findCommonItems(frontend, backend));
console.log('9) Arrays equal:', arraysEqual(['Angular', 'React', 'Vue'], ['Vue', 'Angular', 'React']));
console.log('9) Arrays equal (different length):', arraysEqual(['Angular', 'React'], ['Angular', 'React', 'Vue']));
console.log('10) Filter users:', filterUsers(users, (user) => user.active));
const counter = createCounter();
console.log('11) Counter:', counter(), counter(), counter());
console.log('12) Search users:', searchUsers([
  { name: 'Sammit', city: 'Berlin' },
  { name: 'John', city: 'Hamburg' },
  { name: 'Anna', city: 'Berlin' },
  { name: 'Peter', city: 'Munich' },
], 'ber'));
console.log('13) Pagination:', paginate(users, 2, 2));

getUsers().then((activeUsers) => console.log('14) Active users from API:', activeUsers));

fetchUserDataSequentially().then((result) => console.log('15) Sequential API result:', result));

const search = debounce((value: string) => console.log('16) Debounced API call:', value), 500);
search('A');
search('An');
search('Ann');
search('Anna');

retry(async () => {
  throw new Error('Failed');
}, 3).catch((error: Error) => console.log('17) Retry failed:', error.message));

const fetchUserById = async (id: number) => {
  console.log('API call for user', id);
  return { id, name: id === 1 ? 'Sammit' : 'John' };
};

const getCachedUser = createCachedFunction(fetchUserById);
getCachedUser(1).then((user) => console.log('18) Cached user 1:', user));
getCachedUser(1).then((user) => console.log('18) Cached user 1 again:', user));
getCachedUser(2).then((user) => console.log('18) Cached user 2:', user));

console.log('Employee names:', getEmployeeNames(employeeUsers));
console.log('Active employees:', getActiveEmployees(employeeUsers));
console.log('Employee id 3:', findEmployeeById(employeeUsers, 3));
console.log('IT employees:', getITEmployees(employeeUsers));
console.log('Average salary:', getAverageSalary(employeeUsers));
console.log('Highest-paid employee:', getHighestPaidEmployee(employeeUsers).name);
console.log('Employees who know JavaScript:', getEmployeesWhoKnowSkill(employeeUsers, 'JavaScript'));
console.log('Employees by department:', countEmployeesByDepartment(employeeUsers));
console.log('Employees grouped by department:', groupEmployeesByDepartment(employeeUsers));
console.log('Highest-paid by department:', getHighestPaidEmployeePerDepartment(employeeUsers));
console.log('Sorted active employees:', sortActiveEmployeesBySalaryDesc(employeeUsers));
console.log('Unique skills:', getUniqueSkills(employeeUsers));
console.log('Total salary of active IT employees:', getTotalSalaryOfActiveITEmployees(employeeUsers));
console.log('Search employees:', searchEmployees(employeeUsers, 'java'));
console.log('Paginate employees:', paginateEmployees(employeeUsers, 2, 2));
