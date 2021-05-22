import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReader, Reader } from '../reader.model';

import { ReaderService } from './reader.service';

describe('Service Tests', () => {
  describe('Reader Service', () => {
    let service: ReaderService;
    let httpMock: HttpTestingController;
    let elemDefault: IReader;
    let expectedResult: IReader | IReader[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ReaderService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Reader', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Reader()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Reader', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Reader', () => {
        const patchObject = Object.assign({}, new Reader());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Reader', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Reader', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addReaderToCollectionIfMissing', () => {
        it('should add a Reader to an empty array', () => {
          const reader: IReader = { id: 123 };
          expectedResult = service.addReaderToCollectionIfMissing([], reader);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reader);
        });

        it('should not add a Reader to an array that contains it', () => {
          const reader: IReader = { id: 123 };
          const readerCollection: IReader[] = [
            {
              ...reader,
            },
            { id: 456 },
          ];
          expectedResult = service.addReaderToCollectionIfMissing(readerCollection, reader);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Reader to an array that doesn't contain it", () => {
          const reader: IReader = { id: 123 };
          const readerCollection: IReader[] = [{ id: 456 }];
          expectedResult = service.addReaderToCollectionIfMissing(readerCollection, reader);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reader);
        });

        it('should add only unique Reader to an array', () => {
          const readerArray: IReader[] = [{ id: 123 }, { id: 456 }, { id: 76180 }];
          const readerCollection: IReader[] = [{ id: 123 }];
          expectedResult = service.addReaderToCollectionIfMissing(readerCollection, ...readerArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const reader: IReader = { id: 123 };
          const reader2: IReader = { id: 456 };
          expectedResult = service.addReaderToCollectionIfMissing([], reader, reader2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(reader);
          expect(expectedResult).toContain(reader2);
        });

        it('should accept null and undefined values', () => {
          const reader: IReader = { id: 123 };
          expectedResult = service.addReaderToCollectionIfMissing([], null, reader, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(reader);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
