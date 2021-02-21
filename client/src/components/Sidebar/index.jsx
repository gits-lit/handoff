import { useEditor, Element } from '@craftjs/core';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import './style.scss';

// All available components
import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';
import { Button } from '../subcomponents/Button';
import { Image } from '../subcomponents/Image';

export const Sidebar = () => {
  const { connectors } = useEditor();

  return (
    <div className="top-bar">
      <button className="component-btn"
        ref={(ref) => connectors.create(ref, <Text text="Edit text" />)}
        variant="contained"
      >
        Text<br />
        <PlusOutlined />
      </button>
      <button className="component-btn"
        ref={(ref) => connectors.create(ref, <Button text="Click me" size="small" />)}
        variant="contained"
      >
        Button<br />
        <PlusOutlined />
      </button>
      <button className="component-btn"
        ref={(ref) => connectors.create(ref, <Element canvas is={Container} padding={20} />)}
        variant="contained"
      >
        Container<br />
        <PlusOutlined />
      </button>
      <button className="component-btn"
        ref={(ref) => connectors.create(ref, <Image />)}
        variant="contained"
      >
        Image<br />
        <PlusOutlined />
      </button>
    </div>
  );
};
