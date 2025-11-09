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


export type DesignFormType = {
  
  fio: string;
  subdivision: string;
  tgId: string;
  branch: string;
  leader: string;
  department: string | undefined;
  type: string;
  title: string | '';
  description: string | '';
  date: string | '';
  target: string | '';
  audience: string | '';
  build: string | '';
  size: string | '';
  orientation: string | '';
  future: string | '';
  place: string | '';
  file: any;
  change: string | '';
  deadline: string | '';
  other: string | '';
}


// UI types



export type departmentType = {
  id: string | number,
  label: string,
  value: string
  icon: string | StaticImageData
}


export type MySelectType = {
  id: string | number,
  value: string,
  label: string,
  icon: any,
}



export type SelectType = {
  id: string | number
  value: string,
  label: string
  icon: any
  iconActive?: any
}

export type MenuType = {
  id: number,
  label: string,
  value: string
}