import { Editor, Frame, Element } from '@craftjs/core';
import React from 'react';

import {Sidebar} from '../Sidebar';
import { Container } from '../subcomponents/Container';
import {Text} from '../subcomponents/Text';

const HomePage = () => {
  return (
    <div>
      <Editor
        resolver={{
          Text,
        }}
      >
        <Frame>
          <Element
            canvas
            is={Container}
            width="40%"
            height="100%"
            padding={['40', '40', '40', '40']}
            background="rgba(255, 255, 255, 1)"
            >
            <Text fontSize={20} text="Hi world!" />
          </Element>
        </Frame>
        <Sidebar />
      </Editor>
    </div>
  );
}

export default HomePage;