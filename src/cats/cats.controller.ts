import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import type { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll() {
    return this.catsService.findAll()
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns an existing cat with ${id} id`;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return `This action deletes an existing cat with ${id} id`;
  }
}
