import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
import './AssistHawker.css';
import {Link} from "react-router-dom";

export function AssistHawkerPage() {
    return (
        <body>
        <GenericLayout id={2} />

        <section className="content"> 
          <div class = "text-alt-l"><HawkerSearchBar searchHawker={SearchHawker}/></div>
          <div>
          {/* <Link to="/page2">
            <button>Sign up</button> 
          </Link> */}
          </div>
        </section>

        <div className="results">
        </div>
        
        </body>
    );
}