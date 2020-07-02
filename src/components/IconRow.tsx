import * as React from "react";

import styles from './IconRow.module.css'

export default class IconRow extends React.Component {
  render() {
    return(
      <div className={ styles.iconrow_container }>
        <ul>
          <li>
            <a href="https://www.galapagos.org/conservation/our-work/tortoise-restoration/">
               <img alt="icon_GTRI" src="./espanola_tortoise_release/icon_GTRI.png"></img>
            </a>
          </li>
          <li>
            <a href="https://www.galapagos.gob.ec/en/national-park/">
              <img alt="icon_PN" src="./espanola_tortoise_release/icon_PNG.png"></img>
            </a>
          </li>
          <li>
            <a href="https://www.galapagos.org/">
              <img alt="icon_GC" src="./espanola_tortoise_release/icon_GC.png"></img>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
