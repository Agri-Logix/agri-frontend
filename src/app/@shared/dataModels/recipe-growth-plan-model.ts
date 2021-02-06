export class RecipeGrowthPlanModel {
  id: number;
  name: string;
  description: string;
  total_days: string;
  last_updated: string;
  next_sched: string;
  status: boolean;
  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.total_days = '';
    this.last_updated = '';
    this.next_sched = '';
    this.status = true;
  }
}
