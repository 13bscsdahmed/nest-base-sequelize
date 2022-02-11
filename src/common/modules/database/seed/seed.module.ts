import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Secret } from '@entities/secret.entity';

@Module({
  imports: [SequelizeModule.forFeature([Secret])],
  providers: [SeedService],
  exports: [SeedService]
})
export class SeedModule {}
