import { IsString } from "class-validator";

export class AcceptServeDto {
    @IsString()
    password: string

    @IsString()
    address: string

    @IsString()
    gender: string

    @IsString()
    age: string

    @IsString()
    role: string
}