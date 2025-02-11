import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Player } from 'src/player/interfaces/player.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async save(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;
    const categoryExists = await this.categoryModel.findOne({
      category,
    });

    if (categoryExists)
      throw new BadGatewayException('Category already registered.');

    const categoryCreated = new this.categoryModel(createCategoryDto);
    return categoryCreated.save();
  }

  async list(): Promise<Category[]> {
    return this.categoryModel.find().populate('players');
  }

  async getCategoryById(_id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id });
    if (!category) {
      throw new BadRequestException(
        `Id ${_id} does not correspond to a category.`,
      );
    }
    return category;
  }

  async update(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const categoryExists = await this.categoryModel.findOne({ _id });

    if (!categoryExists) {
      throw new BadGatewayException(`Category not found`);
    }

    await this.categoryModel.updateOne({ _id }, { $set: updateCategoryDto });
  }

  async deleteCategoryById(_id: string): Promise<void> {
    const categoryExists = await this.categoryModel.findOne({ _id });

    if (!categoryExists) {
      throw new BadGatewayException(`Category with id ${_id} not found`);
    }
    await this.categoryModel.deleteOne({ _id }).exec();
  }

  async assingPlayer(params: {
    category: string;
    idPlayer: string;
  }): Promise<void> {
    const categoryExists = await this.categoryModel.findOne({
      _id: params.category,
    });

    if (!categoryExists) {
      throw new BadGatewayException(`Category not found`);
    }

    if (
      categoryExists.players.find((id) => id.toString() === params.idPlayer)
    ) {
      throw new BadGatewayException(`Player already registered.`);
    }

    const playerExists = await this.playerModel.findOne({
      _id: params.idPlayer,
    });

    if (!playerExists) {
      throw new BadGatewayException(`Player not found`);
    }

    categoryExists.players.push(params.idPlayer);
    await this.categoryModel.updateOne(
      { _id: params.category },
      categoryExists,
    );
  }
}
