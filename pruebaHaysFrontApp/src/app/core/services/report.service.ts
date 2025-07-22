import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReport } from '../models/IReport';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly API = 'http://localhost:3000/reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>(this.API);
  }

  updateReport(report: IReport): Observable<IReport> {
    return this.http.put<IReport>(`${this.API}/${report.id}`, report);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

