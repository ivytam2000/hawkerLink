import { GenericLayout } from './Layout';
import { BookingSessions } from '../components/BookingSessions';
import { getAvailableSessions } from '../services/Booking';
import {Link} from "react-router-dom";

export function BookingPage() {


    const data = getAvailableSessions();



    return (
        <body>
        <GenericLayout />

        <section className="content"> 
        <BookingSessions data={data}/>
        </section>

        <div className="results">
        </div>
        
        </body>
    );
}