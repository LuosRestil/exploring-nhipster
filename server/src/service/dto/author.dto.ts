/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { BookDTO } from './book.dto';

/**
 * A Author DTO object.
 */
export class AuthorDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @ApiModelProperty({ type: BookDTO, isArray: true, description: 'books relationship' })
    books: BookDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
