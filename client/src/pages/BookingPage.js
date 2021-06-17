import { GenericLayout } from './Layout';
import { BookingCard } from '../components/BookingCard';
import {Link} from "react-router-dom";

export function BookingPage() {
    return (
        <body>
        <GenericLayout id={2} />

        <section className="content"> 
        <BookingCard />
        </section>

        <div className="results">
        </div>
        
        </body>
    );
}