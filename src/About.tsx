import * as React from "react";
import ReactMarkdown from 'react-markdown';
import IconRow from './components/IconRow'

interface AboutProps {
  domainlang: string
  markdown_en?: string
  markdown_sp?: string
}

interface AboutState {
  domainlang?: string
  markdown_en: any
  markdown_sp: any
}

export default class About extends React.Component<AboutProps, AboutState> {

  constructor(props: Readonly<AboutProps>){

    super(props)
    this.state = {
      domainlang: this.props.domainlang,
      markdown_en: '',
      markdown_sp: ''
    };

  }

  shouldComponentUpdate(nextProps: Readonly<AboutProps>, nextState: Readonly<AboutState>) {

    if (this.props.domainlang !== nextProps.domainlang || (this.state.markdown_en == '' && nextState.markdown_en != '')) {
      return true;
    } else {
      return false;
    }

  }

  componentWillReceiveProps(nextProps: Readonly<AboutProps>) {
    this.setState({ domainlang: nextProps.domainlang });
  }

  getMdDocuments = function (this: any) {

    fetch('./about_text_sp.md').then(res => res.text()).then(text => this.setState({ markdown_sp: text }));

    fetch('./about_text_en.md').then(res => res.text()).then(text => this.setState({ markdown_en: text }));

  }

  //need to get text to wait until promise has resolved - loading until
  render() {

        if (this.state.markdown_en == ''){
          this.getMdDocuments()
        }

        const { markdown_en } = this.state;
        const { markdown_sp } = this.state;

        if (this.props.domainlang == 'SP'){
          return(
            <div className = "aboutcontainer">
              <ReactMarkdown source = { markdown_sp }/>
              <IconRow/>
              <p>Sitio web por Hamish Gibbs. Para informar un problema con este sitio, visite la página de <a href="https://github.com/hamishgibbs/espanola_tortoise_release/issues/new">GitHub</a>.</p>
            </div>
          );
        }else{
          return(
          <div className = "aboutcontainer">
            <ReactMarkdown source = { markdown_en }/>
            <IconRow/>
            <p>Website by Hamish Gibbs. To report a problem with this site, visit the <a href="https://github.com/hamishgibbs/espanola_tortoise_release/issues/new">GitHub</a> page.</p>
          </div>
          );
        }
    }
}
