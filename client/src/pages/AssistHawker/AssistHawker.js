import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
<<<<<<< HEAD
import {Link } from "react-router-dom";
=======
import {HawkerSearchResults} from '../../components/HawkerSearchResults';
>>>>>>> f31497883fd7a2d98302cda2abc7213100443265
import './AssistHawker.css';
import LinkButton from '../../components/LinkButton'

export function AssistHawkerPage() {
    return (
        <body>
        <GenericLayout />

        <section className="content"> 
          <div class = "text-alt-l"><HawkerSearchBar searchHawker={SearchHawker}/></div>
          <div>
          <Link to="/page2"><button>
              Sign up 
            </button>  </Link>
  </div>
        </section>

<<<<<<< HEAD

=======
        <div className="results">
          <HawkerSearchResults/>
        </div>
        
>>>>>>> f31497883fd7a2d98302cda2abc7213100443265
        </body>
    );
}