import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReader } from '../reader.model';

@Component({
  selector: 'jhi-reader-detail',
  templateUrl: './reader-detail.component.html',
})
export class ReaderDetailComponent implements OnInit {
  reader: IReader | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reader }) => {
      this.reader = reader;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
