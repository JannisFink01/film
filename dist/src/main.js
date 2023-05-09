import { DocumentBuilder, SwaggerModule, } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { corsOptions } from './config/cors.options.js';
import { helmetHandlers } from './security/http/helmet.handler.js';
import { nodeConfig } from './config/node.js';
import { paths } from './config/paths.js';
const { httpsOptions, port } = nodeConfig;
const setupSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Film')
        .setDescription('Beispiel für Software Engineering')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const options = {
        customSiteTitle: 'Software Engineering 2021/22',
    };
    SwaggerModule.setup(paths.swagger, app, document, options);
};
const bootstrap = async () => {
    const app = httpsOptions === undefined
        ? await NestFactory.create(AppModule)
        : await NestFactory.create(AppModule, { httpsOptions });
    app.use(helmetHandlers, compression());
    app.useGlobalPipes(new ValidationPipe());
    setupSwagger(app);
    app.enableCors(corsOptions);
    await app.listen(port);
};
await bootstrap();
//# sourceMappingURL=main.js.map