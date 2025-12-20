import { EvidenceRepository, OutboxRepository } from '@core/ports/repositories';
import { ChecklistItem } from '@core/entities/types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export class CompleteChecklist {
  constructor(
    private readonly evidenceRepo: EvidenceRepository,
    private readonly outbox: OutboxRepository
  ) {}

  async execute(jobId: string, checklist: ChecklistItem[]): Promise<void> {
    const evidence = (await this.evidenceRepo.getByJob(jobId)) || {
      jobId,
      beforePhotos: [],
      afterPhotos: [],
      checklist: []
    };
    evidence.checklist = checklist;
    await this.evidenceRepo.save(evidence);
    await this.outbox.enqueue({
      id: uuid(),
      type: 'SYNC_CHECKLIST',
      payload: { jobId, checklist },
      createdAt: dayjs().toISOString()
    });
  }
}
