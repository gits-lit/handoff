import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { useEditor } from '@craftjs/core';

import {Topbar} from '../Topbar';
import { StateSaver } from '../StateSaver';

import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';

const HomePage = () => {
  //const { allDescendants } = useEditor((state, query) => {
    //const selectedNodeId = state.events.selected;
    //let allDescendants = false;

    //if (selectedNodeId)  allDescendants = query.node(selectedNodeId).decendants();  
    //console.log(allDescendants);

    //return { allDescendants }
  //}); 

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
        <StateSaver />
      </Editor>
    </div>
  );
}

export default HomePage;