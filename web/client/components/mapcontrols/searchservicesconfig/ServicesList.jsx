/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { FormGroup, Checkbox, ControlLabel, Glyphicon, Button, FormControl, InputGroup} from 'react-bootstrap';
import Message from '../../I18N/Message';
import ConfirmButton from '../../buttons/ConfirmButton';
import PropTypes from 'prop-types';

import {getMessageById} from '../../../utils/LocaleUtils';

function validate() {
    return true;
}

class ServicesList extends React.Component {
    static propTypes = {
        services: PropTypes.array,
        override: PropTypes.bool,
        promptOverride: PropTypes.bool,
        service: PropTypes.object,
        prompt: PropTypes.string,
        onPropertyChange: PropTypes.func
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        services: [],
        override: false,
        promptOverride: false,
        onPropertyChange: () => {},
        updateSearchPrompt: () => {}
    };

    state = {
        newPrompt: !this.props.prompt ? getMessageById(this.context.messages, "search.addressSearch") : this.props.prompt
    }

    getOptions = () => {
        if (this.props.services.length === 0) {
            return (<div className="search-service-name">
                <Message msgId="search.serviceslistempty"/>
            </div>);
        }
        return this.props.services.map((s, idx) => {
            return (
                <div className="search-service-item" key={idx}>
                    <span className="search-service-name">
                        {s.name}
                    </span>
                    <ConfirmButton className="list-remove-btn" onConfirm={() => this.remove(idx)} text={<Glyphicon glyph="remove-circle" />} confirming={{className: "text-warning list-remove-btn", text: <Message msgId="search.confirmremove" />}}/>
                    <Glyphicon onClick={() => this.edit(s, idx)} glyph="pencil"/>
                </div>);
        });
    };

    getPrompts = () => {
        const error = !this.state.newPrompt;
        const validationType = error ? "error" : "";
        return (
            <div className="">
                <InputGroup className="search-prompt-input">
                    <FormGroup className="search-prompt-input-group" validationState={validationType}>
                        <FormControl
                            className="search-prompt-input-form"
                            maxLength="50"
                            type="text"
                            value={this.state.newPrompt}
                            placeholder="Search by location name..."
                            onChange={event => this.setState({newPrompt: event.target.value})}
                            feedback="Please enter a custom search prompt"
                        />
                        {error && (
                            <div className="search-prompt-input-error"><Message msgId="search.promptinputerror"/></div>
                        )}
                    </FormGroup>
                    <Button
                        className="search-prompt-input-update"
                        disabled={!this.state.newPrompt}
                        variant="outline-secondary"
                        onClick={this.updatePrompt}>
                            Update
                    </Button>
                    <Button
                        className="search-prompt-input-reset"
                        variant="outline-secondary"
                        onClick={this.resetPrompt}>
                            Reset
                    </Button>
                </InputGroup>
            </div>);
    };

    render() {
        const {override} = this.props;
        return (
            <div>
                <form>
                    <FormGroup>
                        <ControlLabel>
                            <Message msgId="search.serviceslistlabel" />
                        </ControlLabel>
                        <div className="services-list">
                            {this.getOptions()}
                        </div>
                    </FormGroup>
                    <Checkbox checked={override} onChange={this.toggleOverride}>
                        <Message msgId="search.overriedservice" />
                    </Checkbox>
                </form>
                <form>
                    <FormGroup>
                        <ControlLabel>
                            <Message msgId="search.custompromptlabel" />
                        </ControlLabel>
                        {this.getPrompts()}
                    </FormGroup>
                </form>
            </div>);
    }

    // Search Service

    edit = (s, idx) => {
        this.props.onPropertyChange("init_service_values", s);
        this.props.onPropertyChange("service", s);
        this.props.onPropertyChange("editIdx", idx);
        this.props.onPropertyChange("page", 1);
    };

    toggleOverride = () => {
        const {prompt, promptOverride, services, override} = this.props;
        this.props.onPropertyChange("textSearchConfig", {services, override: !override, prompt, promptOverride});
    };

    remove = (idx) => {
        const {prompt, promptOverride, services, override} = this.props;
        const newServices = services.filter((el, i) => i !== idx);
        this.props.onPropertyChange("textSearchConfig", {services: newServices, override, prompt, promptOverride});
    };

    // Search Custom Prompt

    updatePrompt = () => {
        const {promptOverride, override, services} = this.props;
        this.props.onPropertyChange("textSearchConfig", {prompt: this.state.newPrompt, promptOverride, services, override});
    };

    resetPrompt = () => {
        const {promptOverride, override, services} = this.props;
        let defaultPrompt = getMessageById(this.context.messages, "search.addressSearch");
        this.props.onPropertyChange("textSearchConfig", {prompt: defaultPrompt, promptOverride: !promptOverride, services, override});
    };
}

export default {Element: ServicesList, validate};
