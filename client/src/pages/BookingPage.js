import { GenericLayout } from './Layout';
import { BookingSessions } from '../components/BookingSessions';
import { getAvailableSessions } from '../services/Booking';
import '../components/BookingCard.css'

export function BookingPage() {


    const data = getAvailableSessions();


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