export interface ISlot{
    _id:string
    startTime: string
    endTime:string
}

export interface SlotRes{
    status: string
    slots:ISlot[]
}

export interface IBooking{
    _id: string
    userId: string
    timeSlotId: ISlot
    invitee: string
    bookingDate: string
    status: string
    bookedDate: string,
    endTime:string
}