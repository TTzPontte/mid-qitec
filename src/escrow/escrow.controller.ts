import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscrowService } from './escrow.service';
import { EscrowDto } from './dto/escrow.dto';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post()
  create(@Body() escrowDto: EscrowDto) {
    return this.escrowService.create(escrowDto);
  }

  @Get()
  findAll() {
    console.log('findAll');
    return this.escrowService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    console.log('findOne');
    return this.escrowService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() escrowDto: EscrowDto) {
    return this.escrowService.update(id, escrowDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.escrowService.remove(id);
  }
}
