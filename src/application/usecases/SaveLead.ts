import { LeadRepository } from '@core/ports/repositories';
import { Lead } from '@core/entities/types';

export class SaveLead {
  constructor(private readonly repo: LeadRepository) {}

  async execute(id: string): Promise<Lead | undefined> {
    return this.repo.markStatus(id, 'saved');
  }
}
