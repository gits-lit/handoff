import { useEditor, Element } from '@craftjs/core';
import React from 'react';

import './style.scss';

// All available components
import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';
import { Button } from '../subcomponents/Button';
import { Image } from '../subcomponents/Image';

export const Sidebar = () => {
  const { connectors } = useEditor();

  return (
    <div className="side-bar">
      <button
        ref={(ref) => connectors.create(ref, <Text text="Edit text" />)}
        variant="contained"
      >
        Text
      </button>
      <button
        ref={(ref) => connectors.create(ref, <Button text="Click me" size="small" />)}
        variant="contained"
      >
        Button
      </button>
      <button
        ref={(ref) => connectors.create(ref, <Element canvas is={Container} padding={20} />)}
        variant="contained"
      >
        Container
      </button>
      <button
        ref={(ref) => connectors.create(ref, <Image />)}
        variant="contained"
      >
        Image
      </button>
    </div>
  );
};
