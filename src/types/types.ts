export type TaskType = {
  id: number;
  ygId: string;
  department: string;
  tgId: string;
  title: string;
  description: string;
  status: string;
  deadline: Date | string;
  createdAt: Date;
  updatedAt: Date;
}