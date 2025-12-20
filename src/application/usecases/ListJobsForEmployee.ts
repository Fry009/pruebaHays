import { JobRepository } from '@core/ports/repositories';
import { ServiceJob } from '@core/entities/types';

export class ListJobsForEmployee {
  constructor(private readonly jobs: JobRepository) {}

  async execute(employeeId: string): Promise<ServiceJob[]> {
    return this.jobs.listJobsForEmployee(employeeId);
  }
}
