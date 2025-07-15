import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reports-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss'],
})
export class ReportsFilterComponent {
    @Input({ required: true }) form!: FormGroup<{
    name: FormControl<string>;
    status: FormControl<string>;
  }>;
}
