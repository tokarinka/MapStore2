import React from 'react';

import { FormGroup, Checkbox, ControlLabel, Glyphicon } from 'react-bootstrap';
import Message from '../../I18N/Message';
import ConfirmButton from '../../buttons/ConfirmButton';
import PropTypes from 'prop-types';


function validate() {
    return true;
}


class PromptsList extends React.Component {
    static propTypes = {
        prompts: PropTypes.array,
        override: PropTypes.bool,
        prompt: PropTypes.object,
        onPropertyChange: PropTypes.func
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        prompts: [],
        override: false,
        onPropertyChange: () => {}
    };

    getOptions = () => {};

    render() {}

    edit = (s, idx) => {};

    toggleOverride = () => {};

    remove = (idx) => {};
}

export default {Element: PromptsList, validate};
