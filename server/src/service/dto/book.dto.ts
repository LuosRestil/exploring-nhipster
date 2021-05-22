/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { AuthorDTO } from './author.dto';
import { ReaderDTO } from './reader.dto';

/**
 * A Book DTO object.
 */
export class BookDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @ApiModelProperty({ type: AuthorDTO, description: 'author relationship' })
    author: AuthorDTO;

    @ApiModelProperty({ type: ReaderDTO, isArray: true, description: 'readers relationship' })
    readers: ReaderDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
