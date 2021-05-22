jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IReader, Reader } from '../reader.model';
import { ReaderService } from '../service/reader.service';

import { ReaderRoutingResolveService } from './reader-routing-resolve.service';

describe('Service Tests', () => {
  describe('Reader routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ReaderRoutingResolveService;
    let service: ReaderService;
    let resultReader: IReader | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ReaderRoutingResolveService);
      service = TestBed.inject(ReaderService);
      resultReader = undefined;
    });

    describe('resolve', () => {
      it('should return IReader returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReader = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultReader).toEqual({ id: 123 });
      });

      it('should return new IReader if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReader = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultReader).toEqual(new Reader());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReader = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultReader).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
