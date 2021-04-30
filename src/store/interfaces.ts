
export interface ReadaidData {
  id: number;
  title: string;
  body: string;
  reedtag_id: number;
  created_at: string;
  updated_at: string;
}

export interface SendReadaidData {
  title: string;
  body: string;
  reedtag_id: number;
}

export interface ReadaidImageData {
  id: number;
  caption: string;
  image_path: string;
}

export interface MetaData {
  id: number;
  agent_id: number;
  data_id: number;
  title: string;
  body: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface SendMetaData {
  title: string;
  body: string;
  category: string;
}

export interface MemoryData {
  id: number;
  agent_id: number;
  title: string;
  body: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface SendMemoryData {
  title: string;
  body: string;
  category: string;
}

export interface ClientData {
  id: number;
  name: string;
  level: string;
  text: string;
}

export interface MethodCrad {
  id: number;
  title: string;
  text: string;
  category: string;
  articles_id: number;
  user_id: number;
}

export interface MethodCardItems {
  slug: string;
  methodId: number;
  cardItems: MethodCrad[];
}

export type sendUpdateCard = {
  fieldId: number;
  item: MethodCrad;
}

export type userData = {
  role: string;
  email: string;
  name: string;
}