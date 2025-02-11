import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PlayerModule,
    MongooseModule.forRoot(
      'mongodb+srv://georginisdeveloper:5hQHdskEyFPL3B8J@georginis-dev.fdu6q.mongodb.net/smartranking_db',
    ),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
