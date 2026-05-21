import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CreateRoomDto {
    @ApiProperty({
        description: 'Name of the room',
        example: 'Project Alpha'
    })
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
    name?: string;

    @ApiProperty({
        description: 'Description of the room',
        example: 'A room for Project Alpha discussions'
    })
   
    @IsNotEmpty({ message: 'Description cannot be empty' })
    @IsString({ message: 'Description must be a string' })
    @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
    description!: string;

    
}