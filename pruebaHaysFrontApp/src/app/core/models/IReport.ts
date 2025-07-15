export interface IReport {
  id: number;
  name: string;
  surname: string;
  description: string;
  creationDate: string;
  status: 'Pendiente' | 'Resuelta' | 'Cancelada';
}
