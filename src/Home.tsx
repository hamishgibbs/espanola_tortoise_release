import * as React from "react";
import MapContainer from './components/MapContainer'

type HomeProps = {
  domainlang: string
}

export default class Home extends React.Component<HomeProps> {
  render() {
      return(
          <div>
            <MapContainer/>
          </div>
      );
    };
}
