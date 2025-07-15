import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { IReport } from '../../../../core/models/IReport';
import { ReportService } from '../../../../core/services/report.service';
import { ReportEditDialogComponent } from '../report-edit-dialog/report-edit-dialog.component';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  @Input({ required: true }) filtersForm!: FormGroup<{
    name: FormControl<string>;
    status: FormControl<string>;
  }>;

  displayedColumns = ['name', 'status', 'creationDate', 'description', 'actions'];
  dataSource = new MatTableDataSource<IReport>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reportService: ReportService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();

    this.filtersForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  loadData(): void {
    this.reportService.getReports().subscribe((reports) => {
      this.dataSource.data = reports;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter(); // aplicar filtro inicial
    });
  }

  getFullName(report: IReport): string {
    return `${report.name} ${report.surname}`;
  }

  applyFilter(): void {
    this.dataSource.filterPredicate = (report, filterString) => {
      const filter = JSON.parse(filterString);
      const fullName = `${report.name} ${report.surname}`.toLowerCase();
      const nameMatch = fullName.includes(filter.name.toLowerCase());
      const statusMatch = filter.status ? report.status === filter.status : true;
      return nameMatch && statusMatch;
    };

    const filterValues = {
      name: this.filtersForm.controls.name.value.trim(),
      status: this.filtersForm.controls.status.value,
    };

    this.dataSource.filter = JSON.stringify(filterValues);
  }

  onEdit(report: IReport): void {
    const dialogRef = this.dialog.open(ReportEditDialogComponent, {
      data: report,
    });

    dialogRef.afterClosed().subscribe((updated: IReport | undefined) => {
      if (updated) {
        const index = this.dataSource.data.findIndex(r => r.id === updated.id);
        if (index !== -1) {
          this.dataSource.data[index] = updated;
          this.dataSource._updateChangeSubscription(); // fuerza actualización
          this.applyFilter();
        }
      }
    });
  }

  onDelete(report: IReport): void {
    const confirmed = confirm(`¿Eliminar reporte de ${report.name} ${report.surname}?`);
    if (confirmed) {
      this.dataSource.data = this.dataSource.data.filter(r => r.id !== report.id);
      this.applyFilter();
    }
  }
}
