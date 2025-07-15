import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportsFilterComponent } from '../../components/reports-filter/reports-filter.component';
import { ReportListComponent } from '../../components/report-list/report-list.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsFilterComponent,
    ReportListComponent,
  ],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent {
  filtersForm: FormGroup<{
    name: FormControl<string>;
    status: FormControl<string>;
  }> = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
  });

  // opcional, solo para debug
  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe(console.log);
  }
}
