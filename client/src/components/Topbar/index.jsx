import { useEditor, Element } from '@craftjs/core';
import React from 'react';

import './style.scss';

// All available components
import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';

export const Topbar = () => {
  const { connectors } = useEditor();

  return (
    <div className="top-bar">
      <button
        ref={(ref) => connectors.create(ref, <Text text="Edit text" />)}
        variant="contained"
      >
        Text
      </button>
      <button
        ref={(ref) => connectors.create(ref, <Element canvas is={Container} padding={20} />)}
        variant="contained"
      >
        Container
      </button>
    </div>
  );
};
