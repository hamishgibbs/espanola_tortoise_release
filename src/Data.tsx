import * as React from "react";

import BarChart from './components/BarChart'

interface DataProps {
  domainlang: string
}

export default class Data extends React.Component<DataProps, {}> {
  render() {
    //<p>Site updated + {updatetime[0].time} </p>
    return(
      <div>
        <BarChart domainlang = { this.props.domainlang } width = { 500 } height = { 500 }/>
      </div>
    );
  }
}
