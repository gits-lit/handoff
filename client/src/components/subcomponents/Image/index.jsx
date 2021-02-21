import { useNode } from '@craftjs/core';
import {
    FormControl,
    FormLabel,
    TextField,
} from '@material-ui/core';
import React from 'react';

export const Image = ({ imageLink }) => {
    const {
        connectors: { connect }
    } = useNode((node) => ({
        selected: node.events.selected
    }));

    return (
        <div ref={connect}>
            <img
                src={imageLink}
                alt="your image"
                style={{
                    width: '50%',
                    height: '50%'
                }}
            />
        </div>
    );
};

export const ImageSettings = () => {
    const {
        actions: { setProp },
        props
    } = useNode((node) => ({
        props: node.data.props
    }));

    return(
        <div>
            <FormControl size="small" component="fieldset">
                <FormLabel component="legend">Image Link</FormLabel>
                <TextField onChange={(e) => setProp((props) => (props.imageLink = e.target.value))}/>
            </FormControl>
        </div>
    );
};

export const ImageDefaultProps = {
    imageLink: 'https://designshack.net/wp-content/uploads/placeholder-image.png'
};

Image.craft = {
    displayName: 'Image',
    props: ImageDefaultProps,
    related: {
        settings: ImageSettings
    }
};