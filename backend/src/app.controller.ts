import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Root Endpoint',
    description: 'Returns a welcome message.',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message returned successfully.',
    schema: {
      example: { message: 'Welcome to Taskflow API!' },
    },
  })
  @Get('/')
  getRoot(): { message: string } {
    return {
      message: 'Welcome to Taskflow API!',
    };
  }

  @ApiOperation({
    summary: 'Health Check Endpoint',
    description: 'Returns the health status of the application.',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status returned successfully.',
    schema: {
      example: { status: 'ok' },
    },
  })
  @Get('/health')
  getHealth(): { status: string } {
    return {
      status: 'ok',
    };
  }
}
