import * as React from "react";
import styles from './Header.module.css'
import ToggleLanguage from './ToggleLanguage';
import App from '../App'
import About from '../About'
import Data from '../Data'
import Home from '../Home'
import Timeline from '../Timeline'

import {
  BrowserRouter as Router,
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
							<Router>
							<div>
                <div>
								<nav>
									<ul className={ styles.pageheader }>
									<li>
										<Link to="/espanola_tortoise_release">Las Tortugas</Link>
									</li>
                  <li>
										<Link to="/espanola_tortoise_release/data">Data</Link>
									</li>
                  <li>
										<Link to="/espanola_tortoise_release/timeline">Cronograma</Link>
									</li>
									<li>
										<Link to="/espanola_tortoise_release/about">Información</Link>
									</li>
									<li><ToggleLanguage togglelanguage = { this.props.togglelanguage }/></li>
									</ul>
								</nav>
                </div>
								<Switch>
									<Route exact path="/espanola_tortoise_release">
										<Home/>
									</Route>
                  <Route path="/espanola_tortoise_release/data">
										<Data domainlang = { this.props.domainlang }/>
									</Route>
                  <Route path="/espanola_tortoise_release/timeline">
										<Timeline domainlang = { this.props.domainlang }/>
									</Route>
									<Route path="/espanola_tortoise_release/about">
										<About domainlang = { this.props.domainlang }/>
									</Route>
								</Switch>
							</div>
						</Router>
					</div>
					)
				}else{
					return (
						<div>
							<Router>
							<div>
								<nav>
									<ul className={styles.pageheader}>
									<li>
										<Link to="/espanola_tortoise_release">The Tortoises</Link>
									</li>
                  <li>
										<Link to="/espanola_tortoise_release/data">Data</Link>
									</li>
                  <li>
										<Link to="/espanola_tortoise_release/timeline">Timeline</Link>
									</li>
									<li>
										<Link to="/espanola_tortoise_release/about">About</Link>
									</li>
									<li><ToggleLanguage togglelanguage = { this.props.togglelanguage }/></li>
									</ul>
								</nav>
								<Switch>
									<Route exact path="/espanola_tortoise_release">
										<Home/>
									</Route>
                  <Route path="/espanola_tortoise_release/data">
                    <Data domainlang = { this.props.domainlang }/>
									</Route>
                  <Route path="/espanola_tortoise_release/timeline">
										<Timeline domainlang = { this.props.domainlang }/>
									</Route>
									<Route path="/espanola_tortoise_release/about">
										<About domainlang = { this.props.domainlang }/>
									</Route>
								</Switch>
							</div>
						</Router>
					</div>
					);
				}
  }
}
