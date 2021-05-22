import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ReaderDTO } from '../src/service/dto/reader.dto';
import { ReaderService } from '../src/service/reader.service';

describe('Reader Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(ReaderService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all readers ', async () => {
        const getEntities: ReaderDTO[] = (await request(app.getHttpServer())
            .get('/api/readers')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET readers by id', async () => {
        const getEntity: ReaderDTO = (await request(app.getHttpServer())
            .get('/api/readers/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create readers', async () => {
        const createdEntity: ReaderDTO = (await request(app.getHttpServer())
            .post('/api/readers')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update readers', async () => {
        const updatedEntity: ReaderDTO = (await request(app.getHttpServer())
            .put('/api/readers')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update readers from id', async () => {
        const updatedEntity: ReaderDTO = (await request(app.getHttpServer())
            .put('/api/readers/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE readers', async () => {
        const deletedEntity: ReaderDTO = (await request(app.getHttpServer())
            .delete('/api/readers/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
