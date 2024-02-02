import { Component, OnInit } from '@angular/core';
import {Employee} from "../model/Employee";
import { EmployeeService} from "../services/EmployeeService";
import {Qualification} from "../model/Qualification";
import {forkJoin, Observable} from "rxjs";
import {QualificationService} from "../services/QualificationService";

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  displayedEmployees: Employee[] = [];
  searchId: number | null = null;

  constructor(private employeeService: EmployeeService, private qualificationService: QualificationService) {
    this.displayedEmployees = this.employees;
  }

  ngOnInit(): void {
   this.loadEmployees();
  }
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.employees.forEach(employee => {
        this.getSelectedSkillIds(employee);
      });
      this.displayedEmployees = [...this.employees];
    });
  }
  searchEmployee(): void {
    if (this.searchId !== null) {
      const id = Number(this.searchId);
      this.displayedEmployees = this.employees.filter(employee => employee.id === id);
    } else {
      this.resetSearch();
    }

  }

  resetSearch(): void {
    this.displayedEmployees = [...this.employees];
    this.searchId = null;
  }

  addNewEmployee(): void {
    const existingIds = this.employees.map(employee => employee.id);
    const nextId = this.getSmallestMissingId(existingIds);

    const newEmployee = new Employee(
      nextId,
       '',
       '',
       '',
      '',
      '',
     '',
      []
    );
    newEmployee.isCreating=true;
    this.employees.push(newEmployee);
    this.editRow(newEmployee);
    this.displayedEmployees = [...this.employees];
  }
  getSmallestMissingId(existingIds: number[]): number {
    const sortedIds = existingIds.slice().sort((a, b) => a - b);
    let smallestMissingId = 1;
    for (const id of sortedIds) {
      if (id > smallestMissingId) break;
      if (id === smallestMissingId) smallestMissingId++;
    }
    return smallestMissingId;
  }

  editRow(employee: Employee): void {
    employee.isEditing = true;
  }

  saveRow(employee: Employee, isCreating: boolean): void {
    employee.isEditing = false;
    this.convertTemporarySkillSet(employee).subscribe({
      next: (qualifications) => {
        employee.skillSet = qualifications;

        if (isCreating) {
          this.employeeService.createEmployee(employee).subscribe({
            error: (error) => console.error('Error by creating', error)
          });
        } else {
          this.employeeService.updateEmployee(employee.id, employee).subscribe({
            error: (error) => console.error('Error by updating', error)
          });
        }
      },
      error: (error) => console.error('Error by converting skill set', error)
    });


  }
  requestDeletion(employee: Employee): void {
    employee.isAwaitingDeletion = true;
  }

  confirmDeletion(employee: Employee): void {
    this.employees.splice(this.employees.indexOf(employee), 1);
    this.displayedEmployees = [...this.employees]
    this.employeeService.deleteEmployee(employee.id).subscribe({
      error: (error) => {
        console.error('Error by deleting', error);
      }
    });
  }
  cancelDeletion(employee: Employee): void {
    employee.isAwaitingDeletion = false;
  }

  getSelectedSkillIds(employee: Employee): string {
   return employee.temporarySkillSet = employee.skillSet.map(qualification => qualification.id).join(', ');
  }
  getQualificationIdsFromString(temporarySkillSet: string): number[] {
    return temporarySkillSet.split(',').map(id => Number(id.trim()));
  }
  convertTemporarySkillSet(employee: Employee): Observable<Qualification[]> {
    const ids = this.getQualificationIdsFromString(employee.temporarySkillSet);
    const qualifications$ = ids.map(id => this.qualificationService.getQualificationById(id));

    return forkJoin(qualifications$);
  }
}
