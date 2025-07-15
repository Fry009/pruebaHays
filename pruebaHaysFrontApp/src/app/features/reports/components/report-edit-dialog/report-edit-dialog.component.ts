import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { IReport } from '../../../../core/models/IReport';

@Component({
  selector: 'app-report-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.scss'],
})
export class ReportEditDialogComponent {

form: FormGroup;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: IReport,
  private dialogRef: MatDialogRef<ReportEditDialogComponent>
) {
  this.form = new FormGroup({
    description: new FormControl(data.description, { nonNullable: true }),
    status: new FormControl(data.status, { nonNullable: true }),
  });
}


  save(): void {
    if (this.form.valid) {
      const updated = {
        ...this.data,
        ...this.form.value,
      };
      this.dialogRef.close(updated);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
