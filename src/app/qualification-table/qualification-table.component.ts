import { Component, OnInit } from '@angular/core';

import {QualificationService} from "../services/QualificationService";
import {Qualification} from "../model/Qualification";
import {Employee} from "../model/Employee";

@Component({
  selector: 'app-qualification-table',
  templateUrl: './qualification-table.component.html',
  styleUrls: ['./qualification-table.component.css']
})
export class QualificationTableComponent implements OnInit {
  qualifications: Qualification[] = []; // Ваши начальные данные
  displayedQualifications: Qualification[] = []; // Список для отображения в таблице
  searchId: number | null = null; // ID для поиска
  constructor(private qualificationsService: QualificationService) {
    this.displayedQualifications = this.qualifications;
  }

  ngOnInit(): void {
 this.loadQualification();

  }
  searchQualification(): void {
    if (this.searchId !== null) {
      const id = Number(this.searchId);
      this.displayedQualifications = this.qualifications.filter(qualification => qualification.id === id);
    } else {
      this.resetSearch();
    }
  }
  resetSearch(): void {
    this.displayedQualifications = [...this.qualifications];
    this.searchId = null;
  }

  addNewQualification(): void {
    const existingIds = this.qualifications.map(qualification => qualification.id);
    const nextId = this.getSmallestMissingId(existingIds);

    const newQualification = new Qualification(
      nextId,
       '',
    );
    newQualification.isCreating=true;
    this.qualifications.push(newQualification);
    this.editRow(newQualification);
    this.displayedQualifications = [...this.qualifications];
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
   loadQualification(): void {
     this.qualificationsService.getAllQualifications().subscribe(data => {
       this.qualifications = data;
       this.displayedQualifications = [...this.qualifications];
     });
  }

  editRow(qualification: Qualification): void {
    qualification.isEditing = true;
  }

  saveRow(qualification: Qualification, isCreating: boolean): void {
    qualification.isEditing = false;
    if (isCreating) {
      this.qualificationsService.createQualification(qualification).subscribe({
        error: (error) => {
          console.error('Error by creating', error);
        }
      });
    } else {
      this.qualificationsService.updateQualification(qualification.id, qualification).subscribe({
        error: (error) => {
          console.error('Error by updating', error);
        }
      });
    }

    this.displayedQualifications = [...this.qualifications];
  }
  requestDeletion(qualification: Qualification): void {
    qualification.isAwaitingDeletion = true;
  }
  confirmDeletion(qualification: Qualification): void {
    this.qualifications.splice(this.qualifications.indexOf(qualification), 1);
    this.displayedQualifications = [...this.qualifications]
    this.qualificationsService.deleteQualification(qualification.id).subscribe({
      error: (error) => {
        console.error('Error by creating', error);
      }
    });
  }
  cancelDeletion(employee: Qualification): void {
    employee.isAwaitingDeletion = false;
  }
}
