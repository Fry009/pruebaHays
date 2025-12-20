import { FeatureFlagRepository } from '@core/ports/repositories';
import { FeatureFlag } from '@core/entities/types';

const defaultFeatures: Record<string, FeatureFlag> = {};

export class LocalFeatureFlagRepository implements FeatureFlagRepository {
  async getPlan(employeeId: string): Promise<FeatureFlag> {
    if (!defaultFeatures[employeeId]) {
      defaultFeatures[employeeId] = { plan: 'FREE', enabledFeatures: [] };
    }
    return defaultFeatures[employeeId];
  }

  async upgradePlan(employeeId: string, plan: FeatureFlag['plan']): Promise<FeatureFlag> {
    const enabled = plan === 'PRO_EMPLOYEE'
      ? ['export_pdf', 'kpi_plus', 'smart_tips']
      : plan === 'PRO_TEAM'
        ? ['export_pdf', 'kpi_plus', 'smart_tips', 'team_views']
        : [];
    defaultFeatures[employeeId] = { plan, enabledFeatures: enabled };
    return defaultFeatures[employeeId];
  }
}
