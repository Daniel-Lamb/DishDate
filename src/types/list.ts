import { Restaurant } from './restaurant';

export interface List {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  restaurants: Restaurant[];
}

export interface CreateListInput {
  name: string;
  description?: string;
}

export interface UpdateListInput {
  name?: string;
  description?: string;
}