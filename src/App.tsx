import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import About from './About'

//Add routing
type DomainState = {
  domainlang: string
}

export default class App extends React.Component {

  state = { domainlang: 'EN' }

  toggleLanguage = function(this: any, lang: string): void {

    if(lang == 'SP'){
      lang = 'SP'
    }else{
      lang = 'EN'
    }

    this.setState({
      domainlang: lang
    })

  }

  render() {

    return (
      <div className="App">
        <Header domainlang = { this.state.domainlang } togglelanguage = { this.toggleLanguage.bind(this) }/>
      </div>
    );
  }
}


//export default App;
