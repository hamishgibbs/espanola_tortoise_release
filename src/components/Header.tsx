import * as React from "react";
import styles from './Header.module.css'
import ToggleLanguage from './ToggleLanguage';
import App from '../App'
import About from '../About'
import Data from '../Data'
import Home from '../Home'
import Timeline from '../Timeline'

import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

type HeaderProps = {
  domainlang: string
	togglelanguage: object
}

export default class Header extends React.Component<HeaderProps> {

	render() {

				if (this.props.domainlang == 'SP'){
					return(
						<div>
              <HashRouter>
							<div>
                <div>
								<nav>
									<ul className={ styles.pageheader }>
									<li>
										<Link to="/">Las Tortugas</Link>
									</li>
                  <li>
										<Link to="/data">Data</Link>
									</li>
                  <li>
										<Link to="/timeline">Cronograma</Link>
									</li>
									<li>
										<Link to="/about">Información</Link>
									</li>
									<li><ToggleLanguage togglelanguage = { this.props.togglelanguage }/></li>
									</ul>
								</nav>
                </div>
									<Route exact path="/">
										<Home/>
									</Route>
                  <Route exact path="/data">
										<Data domainlang = { this.props.domainlang }/>
									</Route>
                  <Route exact path="/timeline">
										<Timeline domainlang = { this.props.domainlang }/>
									</Route>
									<Route exact path="/about">
										<About domainlang = { this.props.domainlang }/>
									</Route>
							</div>
              </HashRouter>
					</div>
					)
				}else{
					return (
						<div>
              <HashRouter>
							<div>
								<nav>
									<ul className={styles.pageheader}>
									<li>
										<Link to="/">The Tortoises</Link>
									</li>
                  <li>
										<Link to="/data">Data</Link>
									</li>
                  <li>
										<Link to="/timeline">Timeline</Link>
									</li>
									<li>
										<Link to="/about">About</Link>
									</li>
									<li><ToggleLanguage togglelanguage = { this.props.togglelanguage }/></li>
									</ul>
								</nav>
									<Route exact path="/">
										<Home/>
									</Route>
                  <Route exact path="/data">
                    <Data domainlang = { this.props.domainlang }/>
									</Route>
                  <Route exact path="/timeline">
										<Timeline domainlang = { this.props.domainlang }/>
									</Route>
									<Route exact path="/about">
										<About domainlang = { this.props.domainlang }/>
									</Route>
							</div>
            </HashRouter>
					</div>
					);
				}
  }
}
