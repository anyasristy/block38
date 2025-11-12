import db from "#db/client";
import { createEmployee } from "#db/queries/employees.js";
await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1990-03-15", salary: 75000 },
    { name: "Bob Smith", birthday: "1985-07-22", salary: 82000 },
    { name: "Carol Williams", birthday: "1992-11-08", salary: 68000 },
    { name: "David Brown", birthday: "1988-05-30", salary: 91000 },
    { name: "Eva Martinez", birthday: "1995-09-12", salary: 73000 },
    { name: "Frank Davis", birthday: "1983-02-18", salary: 95000 },
    { name: "Grace Lee", birthday: "1991-06-25", salary: 79000 },
    { name: "Henry Taylor", birthday: "1987-12-03", salary: 88000 },
    { name: "Iris Anderson", birthday: "1993-08-14", salary: 71000 },
    { name: "Jack Wilson", birthday: "1989-04-07", salary: 84000 },
    { name: "Karen Moore", birthday: "1994-10-21", salary: 76000 },
    { name: "Leo Thomas", birthday: "1986-01-19", salary: 92000 }
  ];
  for (const employee of employees) {
    await createEmployee(employee);
  }
}
