import * as React from "react";

type TLProps = {
  togglelanguage: object
}

export default class ToggleLanguage extends React.Component<TLProps> {

  toggleCLick = function(togglefunction: any): void{

    var togglebutton: HTMLElement = document.getElementById('languagetoggle')!;

    if (togglebutton.innerText == 'English'){

      togglefunction('EN')

      togglebutton.innerText = 'Español'

    }else if (togglebutton.innerText == 'Español'){

      togglefunction('SP')

      //not toggling back to english?
      togglebutton.innerText = 'English'
    }

  }

  render() {
    return(
      <button id="languagetoggle" onClick={ this.toggleCLick.bind(null,this.props.togglelanguage) }>Español</button>
    )
  }

}
