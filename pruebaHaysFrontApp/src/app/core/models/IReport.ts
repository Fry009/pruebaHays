export interface IReport {
  id: number;
  name: string;
  surname: string;
  description: string;
  creationDate: string;
  status: ReportStatus;
}

export enum ReportStatus {
  Pendiente = 'Pendiente',
  Resuelta = 'Resuelta',
  Cancelada = 'Cancelada'
}

