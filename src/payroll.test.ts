import { calculatePayslip, Salary } from "./payroll";
test("16 Jähriger mit 700 Fr. Monatslohn, Deductions: ALV(7.7 Fr.) & NBU(5.11 Fr.) expected NetSalary (687.19 Fr.)", ()=>{
    //Arrange
    const salary: Salary = {
        born: new Date(2009,4,25),
        payday: new Date(2025,5,31),
        gross: 700
    };
    //Act
    const payslip = calculatePayslip(salary);
    //Assert
    expect(payslip.deductions.get("AHV")).toBe(0);
    expect(payslip.deductions.get("IV")).toBe(0);
    expect(payslip.deductions.get("EO")).toBe(0);
    expect(payslip.deductions.get("PK")).toBe(0);

    const alv = salary.gross*0.011;
    const nbu = salary.gross*0.0073;
    expect(payslip.deductions.get("ALV")).toBeCloseTo(alv,2);
    expect(payslip.deductions.get("NBU")).toBeCloseTo(nbu,2);

    const expectedDeductions=alv+nbu;
    expect(payslip.totalDeductions).toBeCloseTo(expectedDeductions,2);

    expect(payslip.net).toBeCloseTo(salary.gross-expectedDeductions,2);
})

test("18 Jähriger mit 1200 Fr. Monatslohn, Deductions: ALV, NBU, AHV, IV, EO", ()=>{
    //Arrange
    const salary: Salary = {
        born: new Date(2007,6,12),
        payday: new Date(2025,5,31),
        gross: 1200
    };

    //Act
    const payslip = calculatePayslip(salary);

    //Assert
    expect(payslip.deductions.get("PK")).toBe(0);

    const alv = salary.gross*0.011;
    const nbu = salary.gross*0.0073;
    const ahv = salary.gross*0.087;
    const iv = salary.gross*0.014;
    const eo = salary.gross*0.005;

    expect(payslip.deductions.get("ALV")).toBeCloseTo(alv,2);
    expect(payslip.deductions.get("NBU")).toBeCloseTo(nbu,2);
    expect(payslip.deductions.get("AHV")).toBeCloseTo(ahv, 2);
    expect(payslip.deductions.get("IV")).toBeCloseTo(iv, 2);
    expect(payslip.deductions.get("EO")).toBeCloseTo(eo, 2);

    const expectedDeductions=alv+nbu+ahv+iv+eo;
    expect(payslip.totalDeductions).toBeCloseTo(expectedDeductions,2);

    expect(payslip.net).toBeCloseTo(salary.gross-expectedDeductions,2);
})