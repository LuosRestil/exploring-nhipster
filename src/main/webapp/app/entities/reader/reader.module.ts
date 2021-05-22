import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ReaderComponent } from './list/reader.component';
import { ReaderDetailComponent } from './detail/reader-detail.component';
import { ReaderUpdateComponent } from './update/reader-update.component';
import { ReaderDeleteDialogComponent } from './delete/reader-delete-dialog.component';
import { ReaderRoutingModule } from './route/reader-routing.module';

@NgModule({
  imports: [SharedModule, ReaderRoutingModule],
  declarations: [ReaderComponent, ReaderDetailComponent, ReaderUpdateComponent, ReaderDeleteDialogComponent],
  entryComponents: [ReaderDeleteDialogComponent],
})
export class ReaderModule {}
