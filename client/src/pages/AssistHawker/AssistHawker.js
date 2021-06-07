import {GenericLayout} from '../Layout';
import HawkerSearchBar from '../../components/HawkerSearchBar';
import LanguageSearchBar from '../../components/LanguageSearchBar';
import {SearchHawker} from '../../services/AssistHawker';
import './AssistHawker.css';

export function AssistHawkerPage() {
    return (
        <body>
        <GenericLayout />

        <section className="content"> 
          <div class = "text-alt-l"><HawkerSearchBar searchHawker={SearchHawker}/></div>
          <LanguageSearchBar/>
        </section>

        </body>
    );
}