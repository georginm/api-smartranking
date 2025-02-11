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
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { ParametersValidationPipe } from 'src/common/pipes/parameters-validation.pipe';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('_id', ParametersValidationPipe) _id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    await this.playerService.update(_id, updatePlayerDto);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Get()
  async listPlayers(): Promise<Player[]> {
    const players = await this.playerService.list();
    return players;
  }

  @Get('/:_id')
  async getById(
    @Param('_id', ParametersValidationPipe) _id: string,
  ): Promise<Player> {
    const player = await this.playerService.getPlayerById(_id);
    return player;
  }

  @Delete('/:_id')
  async delete(
    @Param('_id', ParametersValidationPipe) _id: string,
  ): Promise<void> {
    await this.playerService.deletePlayerById(_id);
  }
}
