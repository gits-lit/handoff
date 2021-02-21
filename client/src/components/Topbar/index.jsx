import { useState, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import { Switch } from 'antd';

import teamicons from '../../assets/team-icons.png';
import undo from '../../assets/undo.svg';
import redo from '../../assets/redo.svg';

import './style.scss';

let actions = {};

export const Topbar = (props) => {
  const [encodedString, setEncodedString ] = useState('');
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState(props.name);

  const onLock = () =>{
    actions.setOptions((options) => (options.enabled = !checked));
    setChecked(!checked);
    props.socket.emit('lock', !checked);
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
      
      return ({
        selectedNodeId: state.events.selected,
        enabled: state.options.enabled,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
      });
    }
  );
  
  useEffect(() => {
    props.socket.on("edit-back", data => {
      console.log('receiving back');
      const json = lz.decompress(lz.decodeBase64(data));
      if (Object.keys(json).length > 2) {
        actions.deserialize(json);
        props.updateBase64(json);
      }
    });

    props.socket.on('lock', data => {
      setChecked(data);
    })
  }, [])

  return (
    <div className="top-bar">
      <img className={canUndo ? 'mark' : 'mark disabled'} src={undo} onClick={() => actions.history.undo()}/>
      <img className={canRedo ? 'mark' : 'mark disabled'} src={redo} onClick={() => actions.history.redo()}/>
      <img className='team' src={teamicons}/>
      <span>Lock Editing</span>
      <input className="centered" onChange={(e) => {
        setName(e.target.value);
      }} value={name}/>
      <Switch defaultChecked onChange={onLock} checked={checked} />
    </div>
  )
}