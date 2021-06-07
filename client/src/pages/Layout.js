
export function GenericLayout(props) {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    );
}


function Header() {
    return (
        <header className="page-header">
            <div className="header-logo">
                <p className="header-text">hawkerlink</p>
            </div>

            <nav className="main-nav" id="nav">
                <ul className="main-nav-links">
                    <li><a className="header" href="/">resources</a></li>
                    <li><a className="header" href="/">suggest a hawker</a></li>
                    <li className="current"><a className="header" href="/">assist a hawker</a></li>
                    <li><a className="header" href="/">about us</a></li>
                </ul>
            </nav>
        </header>
    );
}