import { ITimeSlot } from "./slot"

export interface IBooking {
    _id: string
    userId: string
    timeSlotId: ITimeSlot
    status: string
    bookingDate:string
}