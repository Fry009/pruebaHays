import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../../core/services/report.service';
import { IReport } from '../../../../core/models/IReport';

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

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.reportService.getReports().subscribe((reports) => {
      this.dataSource.data = reports;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getFullName(report: IReport): string {
    return `${report.name} ${report.surname}`;
  }
}
