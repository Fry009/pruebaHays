import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportEditDialogComponent } from './report-edit-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IReport, ReportStatus } from '../../../../core/models/IReport';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ReportEditDialogComponent', () => {
  let component: ReportEditDialogComponent;
  let fixture: ComponentFixture<ReportEditDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ReportEditDialogComponent>>;

  const mockReport: IReport = {
    id: 1,
    name: 'María',
    surname: 'López',
    description: 'Acceso fallido',
    status: ReportStatus.Pendiente,
    creationDate: '2024-12-01T10:30:00Z',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReportEditDialogComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockReport },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with report data', () => {
    expect(component.form.value.description).toBe('Acceso fallido');
    expect(component.form.value.status).toBe('Pendiente');
  });


  it('should call dialogRef.close with no data on cancel()', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });



  it('should render the form fields', () => {
    const descriptionField = fixture.debugElement.query(By.css('textarea'));
    const statusField = fixture.debugElement.query(By.css('mat-select'));
    expect(descriptionField).toBeTruthy();
    expect(statusField).toBeTruthy();
  });
});
