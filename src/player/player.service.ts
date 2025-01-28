import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    await this.save(createPlayerDto);
  }

  async list(): Promise<Player[]> {
    return this.playerModel.find({});
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const player = await this.playerModel.findOne({ email });
    if (!player)
      throw new BadRequestException(
        `Email ${email} does not correspond to a player.`,
      );
    return player;
  }

  async update(email: string, createPlayerDto: CreatePlayerDto) {
    return this.playerModel
      .findOneAndUpdate({ email }, { $set: createPlayerDto })
      .exec();
  }

  async deletePlayerByEmail(email: string) {
    await this.playerModel.deleteOne({ email }).exec();
  }

  private async save(createPlayerDto: CreatePlayerDto): Promise<void> {
    const player = new this.playerModel(createPlayerDto);
    await player.save();
  }
}
