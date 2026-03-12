import { faker } from "@faker-js/faker";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATUSES = ["active", "inactive", "pending", "blacklisted"];
const ORGS = ["Lendsqr", "Lendstack", "CreditWave", "QuickCash", "FairCredit"];
const GENDERS = ["Male", "Female"];
const MARITAL = ["Single", "Married", "Divorced", "Widowed"];

function nigerianPhone() {
  const prefixes = ["070", "080", "081", "090", "091"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const rest = String(Math.floor(Math.random() * 1e8)).padStart(8, "0");
  return prefix + rest;
}

const users = [];
for (let i = 1; i <= 500; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  users.push({
    id: String(i),
    fullName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phoneNumber: nigerianPhone(),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    createdAt: faker.date.past({ years: 4 }).toISOString(),
    organization: ORGS[Math.floor(Math.random() * ORGS.length)],
    bvn: Math.floor(2e9 + Math.random() * 1e9).toString(),
    gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
    maritalStatus: MARITAL[Math.floor(Math.random() * MARITAL.length)],
  });
}

const outDir = join(__dirname, "..", "data");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "users.json");
writeFileSync(outPath, JSON.stringify(users, null, 0), "utf8");
console.log(`Wrote ${users.length} users to ${outPath}`);
