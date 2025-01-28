import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PlayerModule,
    MongooseModule.forRoot(
      'mongodb+srv://georginisdeveloper:5hQHdskEyFPL3B8J@georginis-dev.fdu6q.mongodb.net/smartranking_db',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
