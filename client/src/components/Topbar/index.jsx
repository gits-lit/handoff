import { useState, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import { Switch } from 'antd';
import * as prettify from 'html-prettify';

import teamicons from '../../assets/team-icons.png';
import undo from '../../assets/undo.svg';
import redo from '../../assets/redo.svg';

import './style.scss';

let actions = {};

function process(str) {
  var div = document.createElement('div');
  div.innerHTML = str.trim();

  return format(div, 0).innerHTML;
}

function format(node, level) {
  var indentBefore = new Array(level++ + 1).join('  '),
    indentAfter = new Array(level - 1).join('  '),
    textNode;

  for (var i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode('\n' + indentBefore);
    node.insertBefore(textNode, node.children[i]);

    format(node.children[i], level);

    if (node.lastElementChild == node.children[i]) {
      textNode = document.createTextNode('\n' + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
}


export const Topbar = (props) => {
  const [encodedString, setEncodedString] = useState('');
  const [checked, setChecked] = useState(true);
  const [view, setView] = useState(true);
  const [name, setName] = useState(props.name);

  const onLock = () => {
    actions.setOptions((options) => (options.enabled = !checked));
    setChecked(!checked);
    props.socket.emit('lock', !checked);
  };

  const onView = () => {
    var d = document.getElementById("main-canvas");
    setView(!view);
    props.setCodeSwitch(view);
    console.log('CODED');
    let string = prettify(d.outerHTML);
    console.log(process(string));
    props.setCode(process(string));
  }

  const { actions, query, enabled, canUndo, canRedo, selectedNodeId } = useEditor(
    (state, query) => {
      const json = query.serialize();
      const newEncodedString = lz.encodeBase64(lz.compress(json));
      if (encodedString != newEncodedString) {
        if(encodedString != '') {
          props.socket.emit('edit', newEncodedString);
          props.updateBase64(newEncodedString);
        }
        setEncodedString(newEncodedString);
      }
      setEncodedString(newEncodedString);

    return {
      selectedNodeId: state.events.selected,
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    };
  });

  useEffect(() => {
    props.socket.on("edit-back", data => {
      props.updateBase64(data);
      const json = lz.decompress(lz.decodeBase64(data));
      if (Object.keys(json).length > 2) {
        actions.deserialize(json);
      }
    });

    props.socket.on('lock', (data) => {
      setChecked(data);
    });
  }, []);

  return (
    <div className="top-bar">
      <img className={canUndo ? 'mark' : 'mark disabled'} src={undo} onClick={() => actions.history.undo()}/>
      <img className={canRedo ? 'mark' : 'mark disabled'} src={redo} onClick={() => actions.history.redo()}/>
      <img className='team' src={teamicons}/>
      <span>Lock Editing</span>
      <Switch defaultChecked onChange={onLock} checked={checked} />
      <span>Code View</span>
      <Switch defaultChecked onChange={onView} checked={view} />
      <input className="centered" onChange={(e) => {
        setName(e.target.value);
      }} value={name}/>
    </div>
  );
};
