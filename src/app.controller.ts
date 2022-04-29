import { Controller, Get, Request, Post, UseGuards, Body, StreamableFile,Response, Param  } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ValidationLoginUserInput } from './login/login.input';
import { createReadStream } from 'fs';
import * as fs from 'fs';
import { join } from 'path';

@Controller()
export class AppController  {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() input: ValidationLoginUserInput) { 
    return this.authService.login(input);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('getFile:filename')
  getFile(@Param() params, @Response({ passthrough: true }) res): StreamableFile {
    let pathFile = `./static/images/${params.filename}`;

    fs.access(pathFile, 0, (err) => {
      console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
    });
    const file = createReadStream(join(process.cwd(), `./static/images/${params.filename}`));
    res.set({
      'Content-Type': 'image/pdf',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }
}
