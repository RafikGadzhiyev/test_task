export interface ICity {
  id: number;
  name: string;
  data: string;
}

export interface ICitizen {
  id: number;
  name: string;
  city_id: number;
  groups: IGroup[];
}

export interface IGroup {
  type: string;
  name: string;
}

export type Groups = "city" | "district" | "street";
