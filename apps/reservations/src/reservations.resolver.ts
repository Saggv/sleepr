import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ReservationsDocument } from "./models/reservations.schema";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { CurrentUser, UserDto } from "@app/common";

@Resolver(()=> ReservationsDocument)
export class ReservationsResolver{
    constructor(
        private reservationsService: ReservationsService
    ){

    }

    @Mutation(() => ReservationsDocument)
    createReservation(
        @Args('createReservationInput') createReservationInput: CreateReservationDto,
        @CurrentUser() user: UserDto
    ){
       return this.reservationsService.create(createReservationInput, user);
    }

    @Query(()=> [ReservationsDocument], {name: 'reseravations'})
    findAll(){
        return this.reservationsService.findAll();
    }

    @Query(()=> ReservationsDocument)
    findOne(
        @Args('id', {type: () => String}) id: string
    ){
        return this.reservationsService.findOne(id);
    }

    @Mutation(()=> ReservationsDocument)
    removeReservation(
        @Args('id', {type: ()=> String}) id: string
    ){
        this.reservationsService.remove(id);
    }

}