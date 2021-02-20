import React, {useEffect} from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import socketIOClient from "socket.io-client";

import {Topbar} from '../Topbar';
import { StateSaver } from '../StateSaver';

import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';

const ENDPOINT = "http://127.0.0.1:3000";

let prevMouseX, prevMouseY, x, y;

const HomePage = () => {
  useEffect(() => {
    // Update mouse move
    document.addEventListener('mousemove', e => {
      x = e.offsetX;
      y = e.offsetY;
    });

    // Send mouse movement
    const socket = socketIOClient(ENDPOINT);
    const intervalID = window.setInterval(function(){
      if (prevMouseX !== x || prevMouseY !== y) {
        console.log('emitting move');
        console.log(x);
        console.log(y);
        prevMouseX = x;
        prevMouseY = y;
        socket.emit('mousemove', {mx : x, my : y});
      }
   }, 500);

    // Handle another mouse movement
    socket.on("mousemove", data => {
      console.log('got it')
    });
  }, []);



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