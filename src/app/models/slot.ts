export interface ITimeSlot{
    _id:string,
    date: string,
    startTime: string
    endTime: string,
    status: 'available' | 'booked' | 'blocked';
    bookingId?: string | null;
}


export interface ISlotResponse{
    status:string
    timeSlots: ITimeSlot[]
}