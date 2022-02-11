import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogService } from '@common/modules/logger/services';
import { appConstants } from './config/app.constants';
import { UnauthorizedExceptionFilter, ForbiddenExceptionFilter, BadRequestExceptionFilter, requestMiddleware } from '@shared/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let app;
  let configService: ConfigService;
  let logService: LogService;
  try {
    app = await NestFactory.create(AppModule);
    
    // Use customized unauthorized exception filter
    app.useGlobalFilters(new UnauthorizedExceptionFilter(), new ForbiddenExceptionFilter(), new BadRequestExceptionFilter());
    
    // Injecting validation pipe globally
    app.useGlobalPipes(new ValidationPipe());
    
    // Setting app prefix
    app.setGlobalPrefix(appConstants.appPrefix);
    
    configService = app.get(ConfigService);
    
    const port = configService.get('PORT') || 3000;
    
    logService = app.get(LogService);
    logService.info(undefined, 'App initialized successfully');
    // Use global request middleware
    app.use(requestMiddleware);
    
    
    // Swagger initialization
    const options = new DocumentBuilder()
    .setTitle('Product Api')
    .setDescription('This is the product api spec doc')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);
    
    await app.listen(port);
    logService.info(undefined, `App started on port: ${port}`);
    
  } catch (error) {
    logService.error(undefined, `An error occurred initializing app. Error: ${error}`);
    process.exit(1);
  }
  
}

bootstrap();
