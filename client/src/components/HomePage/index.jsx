import React, {useEffect, useState, useReducer} from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import socketIOClient from "socket.io-client";

import Header from '../Header';
import {Sidebar} from '../Sidebar';
import { Topbar } from '../Topbar';
import Cursor from '../Cursor';
import CodeViewer from '../CodeViewer';

import { Button } from '../subcomponents/Button';
import { Container } from '../subcomponents/Container';
import { Image } from '../subcomponents/Image';
import { Text } from '../subcomponents/Text';
import { Dropdown } from '../subcomponents/Dropdown';
import { InputField } from '../subcomponents/InputField';
import { RadioOption} from '../subcomponents/RadioOption';

import './style.scss';

let ENDPOINT = "http://127.0.0.1:3000";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  ENDPOINT = "http://127.0.0.1:3000"
} else {
  // production code
  ENDPOINT = "https://handoff-sc.herokuapp.com/" 
}

const initialState = {cursors: {}};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {cursors: {...state.cursors, ...action.payload}};
    case 'update':
      return {cursors: action.payload};
    default:
      throw new Error();
  }
}

const socket = socketIOClient(ENDPOINT);

let prevMouseX, prevMouseY, x, y;
let cursors2 = {}
let number = 0;

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [baseString, updateBase] = useState('');
  const [codeSwitch, setCodeSwitch] = useState(false);
  const [code, setCode] = useState('');
  const [cursors, setCursors] = useState({});
  const [mouse, updateMouse] = useState(false);
  const [id, setSelfId] = useState(false);

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
      if (data.id != id) {
        const newCursors = {[data.id]: {
          mx: data.mx,
          my: data.my,
          number: data.number
        }}
        number = number + 1
        dispatch({type: 'add', payload: newCursors})
        /*setCursors(prevState => ({
          ...prevState,
          'name': {
            [data.id]: {
              mx: data.mx,
              my: data.my,
              number: Object.keys(cursors).length + 1
            },
          }
      }));*/
        updateMouse(!mouse);
      }
    });

    socket.on("connection", (id) => {
      setSelfId(id);
    })

    socket.on("disconnect", (id) => {
      console.log('disconnecting');
      const newCursors = {...state.cursors};
      delete newCursors[id];
      console.log(newCursors);
      dispatch({type: 'update', payload: newCursors})
      //setCursors(newCursors);
      //updateMouse(!mouse);
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
          Dropdown,
          RadioOption,
          InputField
        }}
      >
        <Frame>
          <Element
            canvas
            is={Container}
            width="60vw"
            position="absolute"
            right='5%'
            bottom='0'
            minHeight="calc(100vh - 150px)"
            padding={20}
            background="rgba(255, 255, 255, 1)"
            id="main-canvas"
            >
          </Element>
        </Frame>
        {codeSwitch ? <CodeViewer html={code}/> : <Sidebar />}
        <Header base64={baseString} enabled={true}/>
        <Topbar updateBase64={(baseString) => {updateBase(baseString)}}name="default.ho" socket={socket} setCodeSwitch={setCodeSwitch} setCode={setCode}/>
      </Editor>
      {
        Object.keys(state.cursors).map((cursorKey) => {
          console.log(state.cursors);
          const cursor = state.cursors[cursorKey];
          return (
            <Cursor key={cursorKey} x={cursor.mx} y={cursor.my} number={cursor.number % 3} mouse={mouse}/>
          )
        })
      }
    </div>
  );
}

export default HomePage;