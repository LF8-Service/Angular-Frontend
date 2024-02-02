import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationTableComponent } from './qualification-table.component';

describe('TableComponent', () => {
  let component: QualificationTableComponent;
  let fixture: ComponentFixture<QualificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
