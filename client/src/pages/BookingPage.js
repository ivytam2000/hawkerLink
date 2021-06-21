import { GenericLayout } from './Layout';
import { BookingSessions } from '../components/Booking/BookingSessions';
import { getAvailableSessions } from '../services/Booking';
import '../components/Booking/BookingCard.css'

export function BookingPage() {

    // COMMENTED OUT FOR DEBUGGING
    const data = getAvailableSessions();
    
    // const data = 
    // [ {availability: 5, startTime: "2021-06-19T15:00:00"},
    //   {availability: 5, startTime: "2021-06-20T15:00:00"},
    //   {availability: 5, startTime: "2021-06-26T15:00:00"},
    //   {availability: 5, startTime: "2021-06-27T15:00:00"},
    //   {availability: 5, startTime: "2021-07-03T15:00:00"},
    //   {availability: 4, startTime: "2021-07-04T15:00:00"}]

    console.log(data);

    return (
        <body>
        <GenericLayout />
    
        <div className="booking-text">
           AVAILABLE   TRAINING   SESSIONS 
        </div>

        <BookingSessions data={data}/>

        <div className="results">
        </div>
        </body>
    );
}