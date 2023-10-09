import { Injectable, Inject } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepositoty: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy
    ){}

  create(createReservationDto: CreateReservationDto, {email, _id: userId}: UserDto) {
    return this.paymentsService.send('create_charge', {
      ...createReservationDto.charge,
      email
    }).pipe(
      map((res) =>{
        return this.reservationRepositoty.create({
          ...createReservationDto,
          timestamp: new Date(),
          userId,
          invoicedId: res.id
        })
      })
    )
  }

  findAll() {
    return this.reservationRepositoty.find({});
  }

  findOne(_id: string) {
    return this.reservationRepositoty.findOne({_id})
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepositoty.findOneAndUpdate({_id}, {updateReservationDto})
  }

  remove(_id: string) {
    return this.reservationRepositoty.findOneAndDelete({_id})
  }
}
