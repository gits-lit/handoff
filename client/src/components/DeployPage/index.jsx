//import * as QueryString from "query-string";
import {useEffect} from 'react';
import lz from 'lzutf8';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';

import { Button } from '../subcomponents/Button';
import { Container } from '../subcomponents/Container';
import { Image } from '../subcomponents/Image';
import { Text } from '../subcomponents/Text';
import './style.scss';


import {
  useLocation
} from "react-router-dom";

const StateManager = () => {
  const {selectedNodeId, actions} = useEditor((state) => ({
    selectedNodeId: state.events.selected
  }));
  let location = useLocation();
  useEffect(() => {
    console.log(location.search);
    const json = lz.decompress(lz.decodeBase64(location.search.substring(1)));
    console.log(json);
    if (Object.keys(json).length > 2) {
      actions.deserialize(json);
    }
  }, [location]);

  return (
    <></>
  )
}

const DeployPage = (props) => {
  return (
    <div className="deploy-page">
    <Editor
    resolver={{
      Button,
      Container,
      Image,
      Text,
    }}
  >
    <Frame>
      <Element
        canvas
        is={Container}
        width="100vw"
        position="absolute"
        right='0'
        bottom='0'
        minHeight="100vh"
        padding={0}
        background="rgba(255, 255, 255, 1)"
        >
      </Element>
    </Frame>
    <StateManager />
  </Editor>
  </div>
  )
}

export default DeployPage;