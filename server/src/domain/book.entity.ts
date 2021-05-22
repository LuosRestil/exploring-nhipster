/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Author } from './author.entity';
import { Reader } from './reader.entity';

/**
 * A Book.
 */
@Entity('book')
export class Book extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @ManyToOne(type => Author)
    author: Author;

    @ManyToMany(type => Reader)
    readers: Reader[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
