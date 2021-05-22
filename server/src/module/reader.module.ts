import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReaderController } from '../web/rest/reader.controller';
import { ReaderRepository } from '../repository/reader.repository';
import { ReaderService } from '../service/reader.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReaderRepository])],
    controllers: [ReaderController],
    providers: [ReaderService],
    exports: [ReaderService],
})
export class ReaderModule {}
