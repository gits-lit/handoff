import { useState } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';

export const StateSaver = () => {
  const [encodedString, setEncodedString ] = useState('');

  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => {
      const json = query.serialize();
      console.log(json);
      const newEncodedString = lz.encodeBase64(lz.compress(json));
      if (encodedString != newEncodedString) {
        setEncodedString(newEncodedString);
        console.log('there was a change, emit to socket.io here');
      }
      
      return ({
        enabled: state.options.enabled,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
      });
    }
  );

  return (
    <h1>hello world</h1>
  )
}