import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportListComponent } from './report-list.component';
import { ReportService } from '../../../../core/services/report.service';
import { of } from 'rxjs';
import { IReport, ReportStatus } from '../../../../core/models/IReport';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;
  let mockReportService: jasmine.SpyObj<ReportService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockReports: IReport[] = [
    {
      id: 1,
      name: 'María',
      surname: 'López',
      description: 'Problema de acceso',
      status: ReportStatus.Pendiente,
      creationDate: ''
    },
    {
      id: 2,
      name: 'Juan',
      surname: 'Pérez',
      description: 'Cambio de contraseña',
      status: ReportStatus.Resuelta,
      creationDate: ''
    },
  ];

  const filtersForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
  });

  beforeEach(async () => {
    mockReportService = jasmine.createSpyObj('ReportService', [
      'getReports',
      'updateReport',
      'deleteReport',
    ]);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReportListComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    component.filtersForm = filtersForm;
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load reports and apply filter', () => {
    mockReportService.getReports.and.returnValue(of(mockReports));
    fixture.detectChanges();

    expect(mockReportService.getReports).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should call updateReport when onEdit is triggered', () => {
    const updatedReport: IReport = { ...mockReports[0], description: 'Updated' };

    mockReportService.getReports.and.returnValue(of(mockReports));
    mockDialog.open.and.returnValue({
      afterClosed: () => of(updatedReport),
    } as any);
    mockReportService.updateReport.and.returnValue(of(updatedReport));

    fixture.detectChanges();
    component.onEdit(mockReports[0]);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockReportService.updateReport).toHaveBeenCalledWith(updatedReport);
  });

  it('should call deleteReport and remove the item from dataSource', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    mockReportService.getReports.and.returnValue(of(mockReports));
    mockReportService.deleteReport.and.returnValue(of(void 0));

    fixture.detectChanges();
    component.onDelete(mockReports[0]);

    expect(mockReportService.deleteReport).toHaveBeenCalledWith(1);
  });

  it('should display rows in the table', () => {
    mockReportService.getReports.and.returnValue(of(mockReports));
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.mat-row'));
    expect(rows.length).toBe(2); // 2 reportes mockeados
  });
});
