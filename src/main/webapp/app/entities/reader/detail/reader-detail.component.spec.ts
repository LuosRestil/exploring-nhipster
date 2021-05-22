import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReaderDetailComponent } from './reader-detail.component';

describe('Component Tests', () => {
  describe('Reader Management Detail Component', () => {
    let comp: ReaderDetailComponent;
    let fixture: ComponentFixture<ReaderDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ReaderDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ reader: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ReaderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReaderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reader on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reader).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
