export type Settings = {
  monthlyIncome: number;
  weeklyHours: number;
  commuteMinutesPerDay: number;
  workDaysPerWeek: number;
};

export type DecisionStatus = 'waiting' | 'bought' | 'skipped';

export type Decision = {
  id: string;
  name: string;
  price: number;
  hours: number;
  status: DecisionStatus;
  createdAt: number;
  decideAt: number;
};

export type DemoUser = {
  id: string;
  email: string;
};
