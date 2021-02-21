import { useState, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';

let actions = {};

export const StateSaver = (props) => {
  const [encodedString, setEncodedString ] = useState('');

  const { actions, query, enabled, canUndo, canRedo, selectedNodeId } = useEditor(
    (state, query) => {
      const json = query.serialize();
      const newEncodedString = lz.encodeBase64(lz.compress(json));
      if (encodedString != newEncodedString) {
        if(encodedString != '') {
          props.socket.emit('edit', newEncodedString);
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
      const json = lz.decompress(lz.decodeBase64(data));
      if (Object.keys(json).length > 2) {
        actions.deserialize(json);
      }
    });
  }, [])

  return (
    <>
    </>
  )
}