import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReader, getReaderIdentifier } from '../reader.model';

export type EntityResponseType = HttpResponse<IReader>;
export type EntityArrayResponseType = HttpResponse<IReader[]>;

@Injectable({ providedIn: 'root' })
export class ReaderService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/readers');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(reader: IReader): Observable<EntityResponseType> {
    return this.http.post<IReader>(this.resourceUrl, reader, { observe: 'response' });
  }

  update(reader: IReader): Observable<EntityResponseType> {
    return this.http.put<IReader>(`${this.resourceUrl}/${getReaderIdentifier(reader) as number}`, reader, { observe: 'response' });
  }

  partialUpdate(reader: IReader): Observable<EntityResponseType> {
    return this.http.patch<IReader>(`${this.resourceUrl}/${getReaderIdentifier(reader) as number}`, reader, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReader>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReader[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addReaderToCollectionIfMissing(readerCollection: IReader[], ...readersToCheck: (IReader | null | undefined)[]): IReader[] {
    const readers: IReader[] = readersToCheck.filter(isPresent);
    if (readers.length > 0) {
      const readerCollectionIdentifiers = readerCollection.map(readerItem => getReaderIdentifier(readerItem)!);
      const readersToAdd = readers.filter(readerItem => {
        const readerIdentifier = getReaderIdentifier(readerItem);
        if (readerIdentifier == null || readerCollectionIdentifiers.includes(readerIdentifier)) {
          return false;
        }
        readerCollectionIdentifiers.push(readerIdentifier);
        return true;
      });
      return [...readersToAdd, ...readerCollection];
    }
    return readerCollection;
  }
}
