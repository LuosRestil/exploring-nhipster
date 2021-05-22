import { EntityRepository, Repository } from 'typeorm';
import { Reader } from '../domain/reader.entity';

@EntityRepository(Reader)
export class ReaderRepository extends Repository<Reader> {}
