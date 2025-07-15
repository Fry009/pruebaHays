import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReport } from '../models/IReport';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>('assets/mock/issuesReport.json');
  }
}
