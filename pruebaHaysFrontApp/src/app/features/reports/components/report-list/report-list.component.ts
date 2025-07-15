import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../../core/services/report.service';
import { IReport } from '../../../../core/models/IReport';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  displayedColumns = ['name', 'status', 'creationDate', 'description'];
  dataSource: IReport[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
   this.loadData();
  }

  loadData(): void {
 this.reportService.getReports().subscribe((reports) => {
      this.dataSource = reports;
    });
  }

  getFullName(report: IReport): string {
    return `${report.name} ${report.surname}`;
  }
}
