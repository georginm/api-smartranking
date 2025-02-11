import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('api/v1/category')
export class CategoriesController {
  constructor(private readonly categoryServices: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryServices.save(createCategoryDto);
  }

  @Get()
  async list(): Promise<Category[]> {
    return await this.categoryServices.list();
  }

  @Get('/:_id')
  async getById(
    @Param('_id' /* CategoryParametersValidationPipe */) _id: string,
  ): Promise<Category> {
    const category = await this.categoryServices.getCategoryById(_id);
    return category;
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('_id' /* CategoryParametersValidationPipe */) _id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoryServices.update(_id, updateCategoryDto);
  }

  @Delete('/:_id')
  async delete(
    @Param('_id' /* CategoryParametersValidationPipe */) _id: string,
  ): Promise<void> {
    await this.categoryServices.deleteCategoryById(_id);
  }

  @Post('/:category/player/:idPlayer')
  async assingPlayer(
    @Param() params: { category: string; idPlayer: string },
  ): Promise<void> {
    return await this.categoryServices.assingPlayer(params);
  }
}
