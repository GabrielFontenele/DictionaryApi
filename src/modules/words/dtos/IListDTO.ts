export interface IListDTO {
  results: IWordAdded[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IWordAdded {
  word: string;
  added: string;
}
