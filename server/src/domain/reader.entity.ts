/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Book } from './book.entity';

/**
 * A Reader.
 */
@Entity('reader')
export class Reader extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @ManyToMany(type => Book)
    @JoinTable({
        name: 'rel_reader__book',
        joinColumn: { name: 'reader_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'book_id', referencedColumnName: 'id' },
    })
    books: Book[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
