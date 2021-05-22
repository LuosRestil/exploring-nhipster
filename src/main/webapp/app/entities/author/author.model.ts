import { IBook } from 'app/entities/book/book.model';

export interface IAuthor {
  id?: number;
  name?: string;
  books?: IBook[] | null;
}

export class Author implements IAuthor {
  constructor(public id?: number, public name?: string, public books?: IBook[] | null) {}
}

export function getAuthorIdentifier(author: IAuthor): number | undefined {
  return author.id;
}
