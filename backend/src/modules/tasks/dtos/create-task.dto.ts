import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Fix login bug', maxLength: 150, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title: string;

  @ApiProperty({ example: 'Detailed description here', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-05-01', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}