import React from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faWindowMaximize } from '@fortawesome/free-regular-svg-icons'
import { faColumns, faExchangeAlt, faCheckCircle, faCompressAlt } from '@fortawesome/free-solid-svg-icons'

import { v4 } from 'uuid'

import style from './styles.module.css'

class HtmlCodeViewer extends React.Component {



  constructor(props) {


    super(props)

    this.labels = {
      html: "html",
      raw: "raw",
      copy: "copy",
      copied: "copied",
      column: <FontAwesomeIcon icon={faColumns} />,
      square: <FontAwesomeIcon icon={faWindowMaximize} />,
    }

    if (this.props.labels)
      for (const label in this.props.labels)
        this.labels[label] = this.props.labels[label]


    this.highlighterId = v4()

    this.onChange = (this.props.onChange) ? this.props.onChange : () => { }

    this.style = (this.props.highlighter) ? this.props.highlighter : agate

    this.id = (props.id) ? props.id : v4()

    this.str = reactElementToJSXString(props.children).replace(/{' '}/g, '');
    this.str = this.str.replace('{','');
    this.str = this.str.replace('}','');
    this.str = this.str.replace('`','');
    this.str = this.str.replace("`",'');
    console.log(this.str);

    let active = this.props.active;
    if (!this.props.active) active = this.labels.html

    if (props.language === 'html') {
      this.str = this.str.replace(/className/g, 'class')
    }

    this.raw = <SyntaxHighlighter
      id={this.highlighterId}
      showLineNumbers
      language='htmlbars'
      style={this.style}
    >
      {this.str}
    </SyntaxHighlighter>

    this.html = props.children

    this.state = {
      content: null,
      label: active,
      copyLabel: this.labels.copy,
      split: this.props.split ? true : false,
      splitIcon: this.props.split ? this.labels.square : this.labels.column,
      copyIcon: <FontAwesomeIcon icon={faCopy} />,
    }

    this.html = <div key={1} id={this.id + '-html'} className={style.content}>{this.html}</div>
    this.raw = <div key={2} id={this.id + '-raw'} className={style.content}>{this.raw}</div>
    this.bar = React.createRef();

    this.dragbar = <div ref={this.bar} className={style.dragbar}
    >
      <FontAwesomeIcon className={style.resize} icon={faCompressAlt} 
        onMouseDown={() => {
          document.addEventListener('mousemove', this.drag)
        }}

        onTouchStart={() => {
          document.addEventListener('touchmove', this.drag)
        }}
      />
    </div>

    this.displayHtml = this.displayHtml.bind(this)
    this.displayRaw = this.displayRaw.bind(this)
    this.toggle = this.toggle.bind(this)
    this.drag = this.drag.bind(this)
    this.copyToClipBoard = this.copyToClipBoard.bind(this)
    this.container = React.createRef();

  }

  drag(e) {
    const cont = this.container.current;
    let x;
    let y;
    if (e.touches) {
      x = e.touches[0].pageX - cont.offsetLeft;
      y = e.touches[0].pageY - cont.offsetTop;
    }
    else {
      x = e.pageX - cont.offsetLeft;
      y = e.pageY - cont.offsetTop;
    }
    
    const xPerc = x / cont.clientWidth * 100 - 2;
    const yPerc = y / cont.clientHeight * 100 - 2;

    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges()

    if (this.bar.current.offsetWidth < this.bar.current.offsetHeight) {
      cont.style.gridTemplateRows = "1fr";
      cont.style.gridTemplateColumns = xPerc + "% 2% auto";

    } else {
      cont.style.gridTemplateColumns = "1fr";
      cont.style.gridTemplateRows = yPerc + "% 2% auto";
    }
  }

  toggle() {
    if (this.state.label === this.labels.raw) {
      this.displayRaw()
      this.setState({ label: this.labels.html })
    }

    else if (this.state.label === this.labels.html) {
      this.displayHtml()
      this.setState({ label: this.labels.raw })
    }

  }

  displayHtml() {

    this.onChange(this.state.label)
    const classList = this.container.current.classList;
    if (this.state.split) {
      classList.add(style.grid);
      classList.remove(style.block);
    } else {
      classList.remove(style.grid);
      classList.add(style.block);
    }

    this.setState({ content: this.state.split ? [this.html, this.dragbar, this.raw] : this.html })
  }

  displayRaw() {
    this.onChange(this.state.label)
    const classList = this.container.current.classList;
    if (this.state.split) {
      classList.add(style.grid);
      classList.remove(style.block);
    } else {
      classList.remove(style.grid);
      classList.add(style.block);
    }

    this.setState({ content: this.state.split ? [this.raw, this.dragbar, this.html] : this.raw })
  }

  componentDidMount() {
    this.toggle()
  }

  copyToClipBoard(e) {

    this.setState({ copyIcon: <FontAwesomeIcon icon={faCheckCircle} /> })

    navigator.clipboard.writeText(this.str).then(() => {
      setTimeout(() => {
        this.setState({ copyIcon: <FontAwesomeIcon icon={faCopy} /> })
      }, 500)
    })
  }

  render() {
    return (
      <div className={[style.htmlViewer, style.overflowHidden].join(' ')} id={this.id}
        onMouseUp={() => {
          document.removeEventListener('mousemove', this.drag)
        }}
        onTouchEnd={() => {
          document.removeEventListener('touchmove', this.drag)
        }}>

        <div className={style.togglerContainer} id={this.id + '-togglerContainer'}>

          {this.props.title ? <div className={style.title}>{this.props.title}</div> : null}

          <div className={style.toggler} id={this.id + '-toggler'}>

            <button  
              onClick={() => {
                const newSplit = !this.state.split
                const icon = newSplit ? this.labels.square : this.labels.column;

                this.setState({ split: newSplit, splitIcon: icon }, () => {
                  (this.state.label === this.labels.html) ? this.displayRaw() : this.displayHtml()
                })
              }}
              className={(this.state.split) ? [style.button, style.label, style.active].join(' ') : style.label}>
              {this.state.splitIcon}
            </button>

            <button 
              onClick={this.toggle}
              className={[style.label, style.button].join(' ')}>
              <FontAwesomeIcon icon={faExchangeAlt} />
            </button>

            <button 
              className={(this.state.copying) ? [style.label, style.copying].join(' ') : style.label}
              onClick={this.copyToClipBoard}>
              {this.state.copyIcon}
            </button>
          </div>

        </div>

        <div ref={this.container} className={[style.contentContainer].join()} id={this.id + '-container'}>
          {this.state.content}
        </div>
      </div>
    )
  }
}

export default HtmlCodeViewer