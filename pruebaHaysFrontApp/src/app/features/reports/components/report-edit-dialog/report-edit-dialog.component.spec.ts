import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEditDialogComponent } from './report-edit-dialog.component';

describe('ReportEditDialogComponent', () => {
  let component: ReportEditDialogComponent;
  let fixture: ComponentFixture<ReportEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
