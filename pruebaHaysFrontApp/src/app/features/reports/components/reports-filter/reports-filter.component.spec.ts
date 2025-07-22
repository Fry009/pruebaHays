import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsFilterComponent } from './reports-filter.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReportsFilterComponent', () => {
  let component: ReportsFilterComponent;
  let fixture: ComponentFixture<ReportsFilterComponent>;

  let testForm: FormGroup<{
    name: FormControl<string>;
    status: FormControl<string>;
  }>;

  beforeEach(async () => {
    // Crear el formulario usando 'nonNullable' para compatibilidad total con tipado fuerte
    testForm = new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      status: new FormControl('', { nonNullable: true }),
    });

    await TestBed.configureTestingModule({
      imports: [
        ReportsFilterComponent,
        ReactiveFormsModule,
        NoopAnimationsModule, // evita errores por animaciones de Angular Material
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsFilterComponent);
    component = fixture.componentInstance;
    component.form = testForm;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name input with correct label', () => {
    const inputLabel = fixture.debugElement.query(By.css('mat-form-field mat-label')).nativeElement;
    expect(inputLabel.textContent).toContain('Buscar por nombre');
  });

  it('should bind name input to form control', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Juan Pérez';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.controls.name.value).toBe('Juan Pérez');
  });

  it('should render the status select', () => {
    const select = fixture.debugElement.query(By.css('mat-select'));
    expect(select).toBeTruthy();
  });

  it('should update the status control when value changes', () => {
    component.form.controls.status.setValue('Pendiente');
    fixture.detectChanges();

    expect(component.form.controls.status.value).toBe('Pendiente');
  });
});
