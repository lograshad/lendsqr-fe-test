/**
 * Seed script: this enriches data/users.json with extra fields for the user detail page.
 * just run this: npx tsx scripts/seed-user-details.ts, or npm or use whichever you'd like
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const USERS_PATH = join(process.cwd(), "data", "users.json");

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}.00`;
}

const CHILDREN = ["None", "1", "2", "3", "4", "5"];
const RESIDENCE = ["Parent's Apartment", "Rented Apartment", "Own Apartment", "Family Home"];
const EDUCATION = ["B.Sc", "HND", "M.Sc", "MBA", "PhD", "OND"];
const EMPLOYMENT = ["Employed", "Self-Employed", "Unemployed", "Student", "Retired"];
const SECTORS = [
  "FinTech",
  "Banking",
  "Telecom",
  "Healthcare",
  "Education",
  "E-commerce",
  "Agriculture",
  "Law",
];
const DURATIONS = ["1 year", "2 years", "3 years", "5 years", "8 years", "10 years"];
const INCOME_RANGES = [
  "₦100,000.00- ₦200,000.00",
  "₦200,000.00- ₦400,000.00",
  "₦400,000.00- ₦600,000.00",
  "₦600,000.00- ₦1,000,000.00",
];
const RELATIONSHIPS = [
  "Sister",
  "Brother",
  "Mother",
  "Father",
  "Spouse",
  "Friend",
  "Uncle",
  "Aunt",
];
const FIRST_NAMES = [
  "Grace",
  "Tosin",
  "Debby",
  "Chidi",
  "Adeola",
  "Ngozi",
  "Emeka",
  "Fatima",
  "Bola",
  "Joseph",
];
const LAST_NAMES = [
  "Effiom",
  "Dokunmu",
  "Ogana",
  "Okonkwo",
  "Adeyemi",
  "Eze",
  "Mohammed",
  "Afolabi",
  "Taiwo",
  "Nwosu",
];
const BANKS = [
  "Providus Bank",
  "GTBank",
  "First Bank",
  "Access Bank",
  "UBA",
  "Zenith Bank",
  "Fidelity Bank",
];

function generateGuarantor() {
  const fn = pick(FIRST_NAMES);
  const ln = pick(LAST_NAMES);
  return {
    fullName: `${fn} ${ln}`,
    phoneNumber: `0${pick(["70", "80", "81", "90", "91"])}${String(randInt(10000000, 99999999)).padStart(8, "0")}`,
    email: `${fn.toLowerCase()}@gmail.com`,
    relationship: pick(RELATIONSHIPS),
  };
}

const raw = readFileSync(USERS_PATH, "utf8");
const users = JSON.parse(raw);

for (const user of users) {
  if (user.accountBalance) continue;

  const nameParts = user.fullName.split(" ");
  const handle = `@${nameParts[0]?.toLowerCase() ?? "user"}_${nameParts[1]?.toLowerCase() ?? "x"}`;

  user.accountBalance = formatNaira(randInt(10000, 500000));
  user.accountNumber = String(randInt(1000000000, 9999999999));
  user.bankName = pick(BANKS);
  user.userTier = pick([1, 2, 3]);

  user.children = pick(CHILDREN);
  user.typeOfResidence = pick(RESIDENCE);

  user.levelOfEducation = pick(EDUCATION);
  user.employmentStatus = pick(EMPLOYMENT);
  user.sectorOfEmployment = pick(SECTORS);
  user.durationOfEmployment = pick(DURATIONS);
  user.officeEmail = user.email; // reuse
  user.monthlyIncome = pick(INCOME_RANGES);
  user.loanRepayment = formatNaira(randInt(5000, 100000));

  user.twitter = handle;
  user.facebook = user.fullName;
  user.instagram = handle;

  user.guarantors = [generateGuarantor(), generateGuarantor()];
}

writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), "utf8");
console.log(`Enriched ${users.length} users with detail fields successfully.`);
