import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ReaderDTO } from '../../service/dto/reader.dto';
import { ReaderService } from '../../service/reader.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/readers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('readers')
export class ReaderController {
    logger = new Logger('ReaderController');

    constructor(private readonly readerService: ReaderService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ReaderDTO,
    })
    async getAll(@Req() req: Request): Promise<ReaderDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.readerService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ReaderDTO,
    })
    async getOne(@Param('id') id: string): Promise<ReaderDTO> {
        return await this.readerService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create reader' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ReaderDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() readerDTO: ReaderDTO): Promise<ReaderDTO> {
        const created = await this.readerService.save(readerDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Reader', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update reader' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ReaderDTO,
    })
    async put(@Req() req: Request, @Body() readerDTO: ReaderDTO): Promise<ReaderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Reader', readerDTO.id);
        return await this.readerService.update(readerDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update reader with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ReaderDTO,
    })
    async putId(@Req() req: Request, @Body() readerDTO: ReaderDTO): Promise<ReaderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Reader', readerDTO.id);
        return await this.readerService.update(readerDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete reader' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Reader', id);
        return await this.readerService.deleteById(id);
    }
}
