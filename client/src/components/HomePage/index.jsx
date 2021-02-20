import { Editor, Frame, Element } from '@craftjs/core';
import React from 'react';

import {Topbar} from '../Topbar';
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
            minHeight="800px"
            padding={['40', '40', '40', '40']}
            background="rgba(255, 255, 255, 1)"
            >
            <Text fontSize={20} text="Hi world!" />
          </Element>
        </Frame>
        <Topbar />
      </Editor>
    </div>
  );
}

export default HomePage;