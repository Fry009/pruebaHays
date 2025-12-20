import { EmployeeRepository } from '@core/ports/repositories';
import { Employee } from '@core/entities/types';
import { db } from '../storage/dexieClient';

export class LocalEmployeeRepository implements EmployeeRepository {
  async getEmployee(id: string): Promise<Employee | undefined> {
    return db.employees.get(id);
  }
}
