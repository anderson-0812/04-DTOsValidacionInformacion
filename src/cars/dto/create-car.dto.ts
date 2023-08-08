import { IsString } from "class-validator";


export class CreateCarDto {


    @IsString( {message:"no hay brand"} )
    readonly brand: string;

    @IsString()
    readonly model: string;
}