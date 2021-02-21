import HtmlCodeViewer from '../HTMLCodeViewer';
import { a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import './style.scss'

const CodeViewer = (props) => {
  return (
  <HtmlCodeViewer highlighter={a11yLight} title="Example title" id="code-viewer" active="raw" onChange={(active) => { console.log(active) }}>
    {props.html}
  </HtmlCodeViewer>
  );
}

export default CodeViewer;