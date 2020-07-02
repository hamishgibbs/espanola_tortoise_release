import * as React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import TimelinePanel from './components/TimelinePanel'

import linedata from './json/lines.json'

import styles from './Timeline.module.css'

interface TimelineProps {
  domainlang: string
}

interface TimelineState {
  focus: string
}

export default class Timeline extends React.Component<TimelineProps, TimelineState> {

  constructor(props: any) {
    super(props)
    this.state = {
      focus: this.defineMenuItems()[0]
    };

    this.handler = this.handler.bind(this)

  }

  defineMenuItems = function(): Array<string> {
    return(linedata.features.map(function(x){return(x.properties.id);}));
  }

  handler(e: any) {

    this.setState({
      focus: e.value
    })

  }

  render () {

    if ( this.props.domainlang === 'SP'){
      return(
        <div className= { styles.timelinecontainer }>
          <div className={ styles.menucontainer }>
            <Dropdown options = { this.defineMenuItems() } onChange={ this.handler } placeholder="Selección"/>
          </div>
          <TimelinePanel focus={ this.state.focus } domainlang={ this.props.domainlang }/>
        </div>
      )
    }else{
      return(
        <div className= { styles.timelinecontainer }>
          <div className={ styles.menucontainer }>
            <Dropdown options = { this.defineMenuItems() } onChange={ this.handler } placeholder="Selection"/>
          </div>
          <TimelinePanel focus={ this.state.focus } domainlang={ this.props.domainlang }/>
        </div>
      )
    }

  }
}
