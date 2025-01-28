import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}
  @Post()
  async updatePlayer(
    @Query('email') email: string,
    @Body() createPlayerDto: CreatePlayerDto,
  ) {
    await this.playerService.update(email, createPlayerDto);
  }

  @Post('create')
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;
    await this.playerService.createPlayer(createPlayerDto);
    return JSON.stringify({ email });
  }

  @Get()
  async listPlayers() {
    const players = await this.playerService.list();
    return JSON.stringify(players);
  }

  @Get('get-by-email')
  async getbyEmail(@Query('email') email: string) {
    const player = await this.playerService.getPlayerByEmail(email);
    return JSON.stringify(player);
  }

  @Delete()
  async delete(@Query('email') email: string) {
    const player = await this.playerService.deletePlayerByEmail(email);
    return JSON.stringify(player);
  }
}
