import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IReader, Reader } from '../reader.model';
import { ReaderService } from '../service/reader.service';
import { IBook } from 'app/entities/book/book.model';
import { BookService } from 'app/entities/book/service/book.service';

@Component({
  selector: 'jhi-reader-update',
  templateUrl: './reader-update.component.html',
})
export class ReaderUpdateComponent implements OnInit {
  isSaving = false;

  booksSharedCollection: IBook[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    books: [],
  });

  constructor(
    protected readerService: ReaderService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reader }) => {
      this.updateForm(reader);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reader = this.createFromForm();
    if (reader.id !== undefined) {
      this.subscribeToSaveResponse(this.readerService.update(reader));
    } else {
      this.subscribeToSaveResponse(this.readerService.create(reader));
    }
  }

  trackBookById(index: number, item: IBook): number {
    return item.id!;
  }

  getSelectedBook(option: IBook, selectedVals?: IBook[]): IBook {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReader>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(reader: IReader): void {
    this.editForm.patchValue({
      id: reader.id,
      name: reader.name,
      books: reader.books,
    });

    this.booksSharedCollection = this.bookService.addBookToCollectionIfMissing(this.booksSharedCollection, ...(reader.books ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.bookService
      .query()
      .pipe(map((res: HttpResponse<IBook[]>) => res.body ?? []))
      .pipe(map((books: IBook[]) => this.bookService.addBookToCollectionIfMissing(books, ...(this.editForm.get('books')!.value ?? []))))
      .subscribe((books: IBook[]) => (this.booksSharedCollection = books));
  }

  protected createFromForm(): IReader {
    return {
      ...new Reader(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      books: this.editForm.get(['books'])!.value,
    };
  }
}
