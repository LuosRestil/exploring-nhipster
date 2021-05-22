import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IReader } from '../reader.model';
import { ReaderService } from '../service/reader.service';

@Component({
  templateUrl: './reader-delete-dialog.component.html',
})
export class ReaderDeleteDialogComponent {
  reader?: IReader;

  constructor(protected readerService: ReaderService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.readerService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
