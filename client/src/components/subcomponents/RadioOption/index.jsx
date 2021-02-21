import { useNode } from '@craftjs/core';
import {
  Button as MaterialButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

export const RadioOption = ({ text, option1, option2, option3 }) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);
  const [val, setVal] = useState('one');

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
      className="top-m"
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">{text}</FormLabel>
        <RadioGroup aria-label="inputs" name="inputs" defaultValue="one">
          <FormControlLabel value="one" control={<Radio />} label={option1} />
          <FormControlLabel value="two" control={<Radio />} label={option2} />
          <FormControlLabel value="three" control={<Radio />} label={option3} />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const RadioSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel className="mui-label" component="legend">
          Label
        </FormLabel>
        <TextField
          className="mui-input"
          onChange={(e) => setProp((props) => (props.text = e.target.value))}
        />
        <FormLabel className="mui-label" component="legend">
          Option 1
        </FormLabel>
        <TextField
          className="mui-input"
          onChange={(e) => setProp((props) => (props.option1 = e.target.value))}
        />
        <FormLabel className="mui-label" component="legend">
          Option 2
        </FormLabel>
        <TextField
          className="mui-input"
          onChange={(e) => setProp((props) => (props.option2 = e.target.value))}
        />
        <FormLabel className="mui-label" component="legend">
          Option 3
        </FormLabel>
        <TextField
          className="mui-input"
          onChange={(e) => setProp((props) => (props.option3 = e.target.value))}
        />
      </FormControl>
    </>
  );
};

export const RadioDefaultProps = {
  text: 'Radio',
  option1: 'One',
  option2: 'Two',
  option3: 'Three',
};

RadioOption.craft = {
  displayName: 'Radio Option',
  props: RadioDefaultProps,
  related: {
    settings: RadioSettings,
  },
};
