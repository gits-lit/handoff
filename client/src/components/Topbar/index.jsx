import { useEditor, Element } from '@craftjs/core';
import {
  Button as MaterialButton,
} from '@material-ui/core';
import React from 'react';

import './style.scss';
import { Text } from '../subcomponents/Text';

export const Topbar = () => {
  const { connectors } = useEditor();

  return (
    <div className="top-bar">
      <MaterialButton
        ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
        variant="contained"
      >
        Text
      </MaterialButton>
    </div>
  );
};
