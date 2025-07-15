import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportListComponent } from '../../components/report-list/report-list.component';


@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, ReportListComponent],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent {}
