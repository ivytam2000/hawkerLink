import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './AssistHawker.css';

export function AssistHawkerPage() {
    return (
        <body>
        <GenericLayout />

        <section className="content"> 
          <div class = "text-alt-l"><HawkerSearchBar searchHawker={SearchHawker}/></div>
        </section>

        <div className="results">
          <HawkerSearchResults/>
        </div>
        
        </body>
    );
}