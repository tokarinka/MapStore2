import React from 'react';

import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Message from '../../I18N/Message';
import assign from 'object-assign';
import PropTypes from 'prop-types';

function validate(prompt = {}) {
    const {name = ''} = prompt;
    return name.length > 0 && url.length > 0 && typeName.length > 0 && queriableAttributes.length > 0;
}

class SearchPrompt extends React.Component {}

export default { Element: SearchPrompt, validate};
