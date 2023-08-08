import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

// TODOS LOS SERVICIOS SON PROVIDERS Y NO TODOS LOS PROVIDER SON PROVIDERS SON SERVICIOS
// LOS SERVICIOS SON LOS QUE SE ENCARGAND E LA LOGICA DE NEGOCIO
@Injectable() // este decorador significa q se peude inyectar en otros lados 
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand:'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeeper',
            model: 'Cherokee'
        }
    ];

    findAll(){
        return this.cars;
    }

    findOneById(id:string){

        let cars = this.cars.find(objeto => objeto.id === id);

        // if(cars == null || cars == undefined) {
        //     return {
        //         statusCode: 400,
        //         status: false,
        //         msj: 'Fuera del rango de la lista de carros o no se hallo ningun carro con ese id'
        //     }
        // }else{
        //     return car s;
        // }

        if(!cars)
            throw new NotFoundException(`Car with id ${id} not found`);
        
        return cars;
        
    }

    create(createCarDto: CreateCarDto){

        const car: Car = {
            id: uuid(),
            ...createCarDto // esto tres puntos es lo mismo que poner brand: createCarDto.brand, model: createCarDto.model es decir se asigna con 3 puntos todaslas propiedades del objeto
        };
        this.cars.push(car);

        return car;
    }


    update(id: string, updateCarDto: UpdateCarDto){

        let carDB = this.findOneById(id);

        if(updateCarDto.id && updateCarDto.id != id){
            throw new BadRequestException({message: `Id de carro no corresponde al que se envia por parametro  con el que se recibe en el body `});
        }

        this.cars = this.cars.map(car => {
            if ( car.id === id){
                carDB = {
                    ...carDB,
                    ...updateCarDto, // esto sobreescribe alspropiedades anteriorres de carDB
                    id, // y aqui en caso deque en updateCarDto tenga id aqui lo sobreescribo
                }
                return carDB;
            }
            return car
        });

        return carDB;

    }

    delete(id: string) {
        let carDB = this.findOneById(id);

        this.cars =  this.cars.filter(car => car.id != id);

        return carDB;
        
    }
}
