import { IBook } from 'app/entities/book/book.model';

export interface IReader {
  id?: number;
  name?: string;
  books?: IBook[] | null;
}

export class Reader implements IReader {
  constructor(public id?: number, public name?: string, public books?: IBook[] | null) {}
}

export function getReaderIdentifier(reader: IReader): number | undefined {
  return reader.id;
}
