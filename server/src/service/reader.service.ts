import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ReaderDTO } from '../service/dto/reader.dto';
import { ReaderMapper } from '../service/mapper/reader.mapper';
import { ReaderRepository } from '../repository/reader.repository';

const relationshipNames = [];
relationshipNames.push('books');

@Injectable()
export class ReaderService {
    logger = new Logger('ReaderService');

    constructor(@InjectRepository(ReaderRepository) private readerRepository: ReaderRepository) {}

    async findById(id: string): Promise<ReaderDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.readerRepository.findOne(id, options);
        return ReaderMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ReaderDTO>): Promise<ReaderDTO | undefined> {
        const result = await this.readerRepository.findOne(options);
        return ReaderMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ReaderDTO>): Promise<[ReaderDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.readerRepository.findAndCount(options);
        const readerDTO: ReaderDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(reader => readerDTO.push(ReaderMapper.fromEntityToDTO(reader)));
            resultList[0] = readerDTO;
        }
        return resultList;
    }

    async save(readerDTO: ReaderDTO): Promise<ReaderDTO | undefined> {
        const entity = ReaderMapper.fromDTOtoEntity(readerDTO);
        const result = await this.readerRepository.save(entity);
        return ReaderMapper.fromEntityToDTO(result);
    }

    async update(readerDTO: ReaderDTO): Promise<ReaderDTO | undefined> {
        const entity = ReaderMapper.fromDTOtoEntity(readerDTO);
        const result = await this.readerRepository.save(entity);
        return ReaderMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.readerRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
