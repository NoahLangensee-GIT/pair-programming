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

    const alv = 700*0.011;
    const nbu = 700*0.0073;
    expect(payslip.deductions.get("ALV")).toBeCloseTo(alv,2);
    expect(payslip.deductions.get("NBU")).toBeCloseTo(nbu,2);

    const expectedDeductions=alv+nbu;
    expect(payslip.totalDeductions).toBeCloseTo(expectedDeductions,2);

    expect(payslip.net).toBeCloseTo(700-expectedDeductions,2);
})