import React, {useEffect, useState} from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import socketIOClient from "socket.io-client";

import {Sidebar} from '../Sidebar';
import { Header } from '../Header';
import Cursor from '../Cursor';


import { Button } from '../subcomponents/Button';
import { Container } from '../subcomponents/Container';
import { Image } from '../subcomponents/Image';
import { Text } from '../subcomponents/Text';

import './style.scss';

const ENDPOINT = "http://127.0.0.1:3000";
const socket = socketIOClient(ENDPOINT);

let prevMouseX, prevMouseY, x, y;

const HomePage = () => {
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    // Update mouse move
    document.addEventListener('mousemove', e => {
      x = e.pageX;
      y = e.pageY;
    });
    document.addEventListener('drag', e => {
      x = e.pageX;
      y = e.pageY;
    });
    document.addEventListener('mouseleave', e => {
      x = 5000;
      y = 0;
    });

    // Send mouse movement
    const intervalID = window.setInterval(function(){
      if (prevMouseX !== x || prevMouseY !== y) {
        prevMouseX = x;
        prevMouseY = y;
        socket.emit('mousemove', {mx : x, my : y});
      }
   }, 20);

    // Handle another mouse movement
    socket.on("mousemove", data => {
      const newCursors = {...cursors};
      newCursors[data.id] = {
        mx: data.mx,
        my: data.my,
        number: Object.keys(cursors).length + 1
      }
      setCursors(newCursors);
    });

    socket.on("disconnect", (id) => {
      const newCursors = {...cursors};
      delete newCursors[id];
      setCursors(newCursors);
    })
  }, []);

  return (
    <div className="handoff-container">
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
            width="40%"
            minHeight="800px"
            padding={['40', '40', '40', '40']}
            background="rgba(255, 255, 255, 1)"

            >
            <Text fontSize={20} text="Drag components onto the canvas to build your site" />
          </Element>
        </Frame>
        <Sidebar />
        <Header socket={socket} />
      </Editor>
      {
        Object.values(cursors).map((cursor) => {
          return (
            <Cursor x={cursor.mx} y={cursor.my} number={cursor.number % 3}/>
          )
        })
      }
    </div>
  );
}

export default HomePage;