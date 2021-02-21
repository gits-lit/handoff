import { useEditor, Element } from '@craftjs/core';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Settings } from '../Settings';
import { Menu } from 'antd';
import { AlertOutlined, CopyOutlined, FormOutlined } from '@ant-design/icons';

import './style.scss';

// All available components
import { Container } from '../subcomponents/Container';
import { Text } from '../subcomponents/Text';
import { Button } from '../subcomponents/Button';
import { Image } from '../subcomponents/Image';
import { InputField } from '../subcomponents/InputField';

export const Sidebar = () => {
  const { connectors } = useEditor();

  const [current, setCurrent] = useState('general');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const renderComponents = () => {
    switch(current) {
      case 'general':
        return (
          <div className="components-menu">
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
            <button className="component-btn"
              ref={(ref) => connectors.create(ref, <InputField text="Input" size="small" />)}
              variant="contained"
            >
              Input Field<br />
              <PlusOutlined />
            </button>
          </div>
        );
      case 'form':
        return (
          <div className="components-menu">
            <button className="component-btn"
              ref={(ref) => connectors.create(ref, <Element canvas is={Container} padding={20} />)}
              variant="contained"
            >
              Container<br />
              <PlusOutlined />
            </button>
            <button className="component-btn"
              ref={(ref) => connectors.create(ref, <InputField text="Input" size="small" />)}
              variant="contained"
            >
              Input Field<br />
              <PlusOutlined />
            </button>
          </div>
        );
      case 'buttons':
        return (
          <div className="components-menu">
            <button className="component-btn"
              ref={(ref) => connectors.create(ref, <Button text="Click me" size="small" />)}
              variant="contained"
            >
              Button<br />
              <PlusOutlined />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="side-bar">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="general" icon={<CopyOutlined />}>
          General
        </Menu.Item>
        <Menu.Item key="form" icon={<FormOutlined />}>
          Form
        </Menu.Item>
        <Menu.Item key="buttons" icon={<AlertOutlined />}>
          Buttons
        </Menu.Item>
      </Menu>
      {renderComponents()}
      <Settings />
    </div>
  );
};
