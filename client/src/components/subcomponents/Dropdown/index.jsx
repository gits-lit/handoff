import { useNode } from '@craftjs/core';
import {
  Button as MaterialButton,
  FormControl,
  FormLabel,
  MenuItem,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export const Dropdown = ({ text, option1, option2, option3 }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <FormControl>
        <InputLabel>{text}</InputLabel>
        <Select style={{ width: '200px' }}>
          <MenuItem>{option1}</MenuItem>
          <MenuItem>{option2}</MenuItem>
          <MenuItem>{option3}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const DropdownSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <FormControl size="large" component="fieldset">
        <FormLabel component="legend">Label</FormLabel>
        <TextField
          onChange={(e) => setProp((props) => (props.text = e.target.value))}
        />
        <br />
        <FormLabel component="legend">Option 1</FormLabel>
        <TextField
          onChange={(e) => setProp((props) => (props.option1 = e.target.value))}
        />
        <br />
        <FormLabel component="legend">Option 2</FormLabel>
        <TextField
          onChange={(e) => setProp((props) => (props.option2 = e.target.value))}
        />
        <br />
        <FormLabel component="legend">Option 3</FormLabel>
        <TextField
          onChange={(e) => setProp((props) => (props.option3 = e.target.value))}
        />
      </FormControl>
    </>
  );
};

export const DropdownDefaultProps = {
  text: 'Dropdown',
  option1: 'One',
  option2: 'Two',
  option3: 'Three',
};

Dropdown.craft = {
  displayName: 'Dropdown',
  props: DropdownDefaultProps,
  related: {
    settings: DropdownSettings,
  },
};
