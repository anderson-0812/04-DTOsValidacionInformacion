import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

//  LOS CONTROLADORES NO MANEJAN LA LOGICA DE NEGOCIO 
//  SOLO ESCUCHAN SOLICITUDES Y REGRESAN RESPUESTAS 


@Controller('cars')
// @UsePipes( ValidationPipe ) // para usar esto debemos instalar yarn add class-validator class-transformer si lo coloque aqui funciona en todas las peticiones 
export class CarsController {

    constructor(
        // inyeccionde  dependencia
        private readonly carsService: CarsService
    ){}


    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }

    @Get(':id')
    // decorador Param es para  q se lea el id que va en la url con ParseIntPipe es unpipe que tarsforma en string a un numero 
    getCarById(@Param('id', new ParseUUIDPipe({version:'4', errorHttpStatusCode:400})/*ParseIntPipe*/) id: string){

        // let limite = this.cars.length;

        // let idInt = parseInt(id);

        // if ( !(Number.isInteger(id)) ) {
        //     return {
        //         statusCode: 400,
        //         status: false,
        //         msj: "Parámetro inválido"
        //     };
        //   }

        

        console.log({ id });
        let car = this.carsService.findOneById(id);
        return {
            car
        };
    }


    @Post()
    // @UsePipes( ValidationPipe ) // para usar esto debemos instalar yarn add class-validator class-transformer si lo coloque aqui funciona soplo en este [post]
    createCar(@Body() createCarDto: CreateCarDto){
        return this.carsService.create(createCarDto);
    }


    @Patch(':id')
    updateCar(
        @Param('id', new ParseUUIDPipe()/*ParseIntPipe*/) id: string,
        @Body() updateCarDto: UpdateCarDto)
    {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', new ParseUUIDPipe()/*ParseIntPipe*/) id: string){

        return this.carsService.delete(id);

    }
}
