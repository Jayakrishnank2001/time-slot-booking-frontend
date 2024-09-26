export interface ITimeSlot{
    date: string,
    startTime: string
    endTime: string,
    status: 'available' | 'booked' | 'blocked';
    bookingId?: string | null;
}