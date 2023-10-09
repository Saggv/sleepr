import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationsDocument } from "./models/reservations.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument>{
    protected readonly logger = new Logger(ReservationsDocument.name);

    constructor(@InjectModel(ReservationsDocument.name) reservationsModel: Model<ReservationsDocument>){
            super(reservationsModel)
    }
}