import { LeadRepository } from '@core/ports/repositories';
import { Lead, LeadStatus } from '@core/entities/types';

export class ListLeads {
  constructor(private readonly repo: LeadRepository) {}

  async execute(filters?: { status?: LeadStatus; source?: string; type?: string }): Promise<Lead[]> {
    return this.repo.list(filters);
  }
}
