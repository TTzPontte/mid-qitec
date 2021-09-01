import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DebtsService } from "./debts.service";
import { DebtDto } from "./dto/debt.dto";

@Controller("debts")
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  create(@Body() debtDto: DebtDto) {
    return this.debtsService.create(debtDto);
  }

  @Get()
  findAll() {
    return this.debtsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.debtsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() debtDto: DebtDto) {
    return this.debtsService.update(+id, debtDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.debtsService.remove(+id);
  }
}
