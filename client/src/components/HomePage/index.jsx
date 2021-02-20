import { Editor, Frame, Element } from '@craftjs/core';
import React from 'react';

import {Sidebar} from '../Sidebar';
//import { Container } from '../components/user/Container';
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
          <Element canvas padding={5} background="#eeeeee">
            <Text fontSize={20} text="Hi world!" />
          </Element>
        </Frame>
        <Sidebar />
      </Editor>
    </div>
  );
}

export default HomePage;