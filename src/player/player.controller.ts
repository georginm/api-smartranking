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
import { PlayerParametersValidationPipe } from './pipes/player-parameters-validation.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('_id', PlayerParametersValidationPipe) _id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    await this.playerService.update(_id, updatePlayerDto);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Get()
  async listPlayers() {
    const players = await this.playerService.list();
    return JSON.stringify(players);
  }

  @Get('/:_id')
  async getById(@Param('_id', PlayerParametersValidationPipe) _id: string) {
    const player = await this.playerService.getPlayerById(_id);
    return JSON.stringify(player);
  }

  @Delete('/:_id')
  async delete(@Param('_id', PlayerParametersValidationPipe) _id: string) {
    const player = await this.playerService.deletePlayerById(_id);
    return JSON.stringify(player);
  }
}
