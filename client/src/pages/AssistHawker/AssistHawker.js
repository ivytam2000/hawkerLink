import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import {Link } from "react-router-dom";
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


        </body>
    );
}