import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const error_messages = errors.map(error =>
          Object.values(error.constraints),
        );
        return new BadRequestException(error_messages.toString());
      },
      forbidUnknownValues: false,
    }),
  );
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10    }));
  const PORT = process.env.NODE_DOCKER_PORT || 8081;
  console.log(`Using port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
