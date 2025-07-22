import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsPageComponent } from './reports-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReportsFilterComponent } from '../../components/reports-filter/reports-filter.component';
import { ReportListComponent } from '../../components/report-list/report-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReportsPageComponent', () => {
  let component: ReportsPageComponent;
  let fixture: ComponentFixture<ReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReportsPageComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ReportsPageComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render ReportsFilterComponent', () => {
    const filterComp = fixture.debugElement.query(
      By.directive(ReportsFilterComponent)
    );
    expect(filterComp).toBeTruthy();
  });

  it('should render ReportListComponent', () => {
    const listComp = fixture.debugElement.query(
      By.directive(ReportListComponent)
    );
    expect(listComp).toBeTruthy();
  });

  it('should pass the filtersForm to children components', () => {
    const filterComp = fixture.debugElement.query(
      By.directive(ReportsFilterComponent)
    ).componentInstance as ReportsFilterComponent;

    const listComp = fixture.debugElement.query(
      By.directive(ReportListComponent)
    ).componentInstance as ReportListComponent;

    expect(filterComp.form).toBe(component.filtersForm);
    expect(listComp.filtersForm).toBe(component.filtersForm);
  });

  it('should update form values when valueChanges is triggered', () => {
    const consoleSpy = spyOn(console, 'log');
    component.filtersForm.controls.name.setValue('Test');
    component.filtersForm.controls.status.setValue('Pendiente');
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalled();
  });
});
