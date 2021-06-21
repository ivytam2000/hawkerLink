import {GenericLayout} from '../Layout';
import {HawkerSearchBar} from '../../components/SearchHawker/HawkerSearchBar';
import {SearchHawker} from '../../services/SearchHawker';
import '../AssistMain/AssistMain.css';
import {Link} from "react-router-dom";

export function SearchHawkerPage() {
    return (
        <body>
        <GenericLayout id={2} />

        <section className="content"> 
          <Link to="/assist"> 
          <button className="info">VOLUNTEER PROCESS</button>
          </Link>
          <p></p>
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