import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReaderComponent } from '../list/reader.component';
import { ReaderDetailComponent } from '../detail/reader-detail.component';
import { ReaderUpdateComponent } from '../update/reader-update.component';
import { ReaderRoutingResolveService } from './reader-routing-resolve.service';

const readerRoute: Routes = [
  {
    path: '',
    component: ReaderComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReaderDetailComponent,
    resolve: {
      reader: ReaderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReaderUpdateComponent,
    resolve: {
      reader: ReaderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReaderUpdateComponent,
    resolve: {
      reader: ReaderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(readerRoute)],
  exports: [RouterModule],
})
export class ReaderRoutingModule {}
