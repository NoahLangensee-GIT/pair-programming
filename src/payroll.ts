export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  const deductions: Deductions = new Map();
  deductions.set("AHV",0);
  deductions.set("IV",0);
  deductions.set("EO",0);
  deductions.set("PK",0);
  deductions.set("ALV",salary.gross*(DEDUCTION_RATES.get("ALV")/100));
  deductions.set("NBU",salary.gross*(DEDUCTION_RATES.get("NBU")/100));
  var totalDeductions = 0;
  deductions.forEach(deduction => {
    totalDeductions += deduction;
  });
  const result: Payslip = {
    salary: salary,
    deductions: deductions,
    totalDeductions: totalDeductions,
    net: salary.gross-totalDeductions,
  };
  return result;
}
