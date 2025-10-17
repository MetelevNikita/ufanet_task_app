import { StaticImageData } from "next/image";

export type TaskType = {
  id: number;
  name: string;
  email: string;
  tgId: string;
  title: string;
  leader: string
  department: string;
  ygId: string;
  status: string;
  deadline: Date | string;
  createdAt: Date;
  updatedAt: Date;
}


// UI types

export type SelectType = {
  value: string,
  label: string
}

export type MenuType = {
  id: number,
  label: string,
  value: string
}