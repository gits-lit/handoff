import { useNode } from '@craftjs/core';
import {
  Button as MaterialButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

// import customize from '../../../assets/customize.svg';

export const InputField = ({ text, size }) => {
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
      <TextField style={{ margin: '5px 0px' }}label={text} size={size} />
    </div>
  );
};

const InputSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Label</FormLabel>
        <TextField
          onChange={(e) => setProp((props) => (props.text = e.target.value))}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">
          <br />
          Size
        </FormLabel>
        <RadioGroup
          defaultValue={props.size}
          onChange={(e) => setProp((props) => (props.size = e.target.value))}
        >
          <FormControlLabel
            label="Small"
            value="small"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Medium"
            value="medium"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Large"
            value="large"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export const InputDefaultProps = {
  text: 'Input',
  size: 'small',
};

InputField.craft = {
  displayName: 'Input Field',
  props: InputDefaultProps,
  related: {
    settings: InputSettings,
  },
};
