import React from 'react';

import { get } from 'lodash';
import { FormGroup, ControlLabel, FormControl, Label, Checkbox } from 'react-bootstrap';
import Slider from 'react-nouislider';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Message from '../../I18N/Message';
import { getMessageById } from '../../../utils/LocaleUtils';


function validate(prompt = {}) {
    return prompt.displayName && prompt.displayName.length > 0;
}


class ResultsPrompts extends React.Component {
    static propTypes = {
        prompt: PropTypes.object,
        launchInfoPanelOptions: PropTypes.array,
        launchInfoPanelDefault: PropTypes.string,
        launchInfoPanelSelectOptions: PropTypes.object,
        onPropertyChange: PropTypes.func
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        prompt: {},
        launchInfoPanelDefault: "no_info",
        launchInfoPanelSelectOptions: {},
        onPropertyChange: () => {}
    };

    render() {}

    updateProp = (prop, path, event) => {};
}

export default { Element: ResultsPrompts, validate};
