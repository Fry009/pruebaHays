import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../../core/services/report.service';
import { IReport } from '../../../../core/models/IReport';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  displayedColumns = ['name', 'status', 'creationDate', 'description'];
  dataSource = new MatTableDataSource<IReport>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() filtersForm!: FormGroup<{
  name: FormControl<string>;
  status: FormControl<string>;
}>;

  constructor(private reportService: ReportService) {}

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
      this.applyFilter();
    });
  }

  getFullName(report: IReport): string {
    return `${report.name} ${report.surname}`;
  }

applyFilter(): void {
  if (!this.filtersForm) return;

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


}
