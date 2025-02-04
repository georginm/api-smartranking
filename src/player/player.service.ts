import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const playerAlreadyRegistered = await this.playerModel.findOne({ email });

    if (playerAlreadyRegistered) {
      throw new BadGatewayException('Email already registered');
    }

    const player = new this.playerModel(createPlayerDto);
    return player.save();
  }

  async list(): Promise<Player[]> {
    return this.playerModel.find({});
  }

  async getPlayerById(_id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id });
    if (!player) {
      throw new BadRequestException(
        `Id ${_id} does not correspond to a player.`,
      );
    }
    return player;
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const playerAlreadyRegistered = await this.playerModel.findOne({ _id });

    if (!playerAlreadyRegistered) {
      throw new BadGatewayException(`Player with id ${_id} not found`);
    }

    this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto });
  }

  async deletePlayerById(_id: string): Promise<void> {
    await this.playerModel.deleteOne({ _id }).exec();
  }
}
