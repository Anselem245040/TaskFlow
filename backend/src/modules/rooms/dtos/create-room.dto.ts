import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Max, MaxLength} from "class-validator";

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
}