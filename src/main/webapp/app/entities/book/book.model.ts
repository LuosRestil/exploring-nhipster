import { IAuthor } from 'app/entities/author/author.model';
import { IReader } from 'app/entities/reader/reader.model';

export interface IBook {
  id?: number;
  name?: string;
  author?: IAuthor;
  readers?: IReader[] | null;
}

export class Book implements IBook {
  constructor(public id?: number, public name?: string, public author?: IAuthor, public readers?: IReader[] | null) {}
}

export function getBookIdentifier(book: IBook): number | undefined {
  return book.id;
}
