import {Link} from "react-router-dom";
import './Layout.css';

export function GenericLayout(props) {
    return (
        <div>
            <Header page={props.id}/>
            {props.children}
        </div>
    );
}

// page parameter is an int 
export function Header(props) {
    const page = props.page;
    var resources = "header";
    var suggest = "header";
    var assist = "header";
    if(page == 0){ 
        resources = "current";
    } else if(page == 1){
        suggest = "current";
    } else if(page == 2){
        assist = "current";
    }
    return (
        <header className="page-header">
            <div className="header-logo">
            <Link to="/">
                <p className="header-text">hawkerlink</p>
            </Link>
            </div>
            <nav className="main-nav" id="nav">
                <ul className="main-nav-links">
                    <Link to="/resources">
                    <li className={resources}><a className="header"href="/">resources</a></li>
                    </Link>
                    <Link to="/suggesthawker">
                    <li className={suggest}><a className="header" href="/">suggest a hawker</a></li>
                    </Link>
                    <Link to="/search">
                    <li className={assist}><a className="header" href="/">assist a hawker</a></li>
                    </Link>
                    <Link to="/assist">
                    <li><a className="header" href="/">about us</a></li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}