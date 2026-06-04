const AUTO_WORDS = [
  "Bumper",
  "Fender",
  "Hood",
  "Door",
  "Panel",
  "Guard",
  "Mirror",
  "Grille",
  "Bonnet",
  "Tailgate",
];
const COLORS = ["Red", "Blue", "Green", "Silver", "Black", "White"];

/** Unique customer for one test run — same 8-digit suffix on first/last name. */
export function generateRandomCustomer() {
  const suffix = String(Math.floor(10000000 + Math.random() * 90000000));
  return {
    firstName: `Automation${suffix}`,
    lastName: `Test${suffix}`,
    selectCustomer: true,
  };
}

/** Unique rego/VIN/color triple driven by Date.now() — safe for edit-quote tests. */
export function generateRandomVehicleEdit() {
  const suffix = Date.now().toString().slice(-5);
  return {
    rego: `REG${suffix}`,
    vin: `VIN${suffix}${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

/** Random auto-part description with a 4-digit timestamp suffix for uniqueness. */
export function randomDesc(prefix: string): string {
  const word = AUTO_WORDS[Math.floor(Math.random() * AUTO_WORDS.length)];
  const id = Date.now().toString().slice(-4);
  return `${prefix} ${word} ${id}`;
}

/** Random labour/paint rate as a string integer between 20–99. */
export function randomRate(): string {
  return String(Math.floor(Math.random() * 80) + 20);
}

export function generateInsuranceClaimNo(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "CL";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result; // e.g. CL61278J44
}

export function generateRegistrationNo(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "R";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result; // e.g. R56GH3GH2
}

export function getFutureDateTime(daysToAdd: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year} 8:00 AM`;
}
