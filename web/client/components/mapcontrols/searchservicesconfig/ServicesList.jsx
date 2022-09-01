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

function validate() {
    return true;
}

class ServicesList extends React.Component {
    static propTypes = {
        services: PropTypes.array,
        override: PropTypes.bool,
        service: PropTypes.object,
        prompt: PropTypes.string,
        onPropertyChange: PropTypes.func,
        updateSearchPrompt: PropTypes.func
    };

    static contextTypes = {
        messages: PropTypes.object
    };

    static defaultProps = {
        services: [],
        override: false,
        onPropertyChange: () => {},
        updateSearchPrompt: () => {}
    };

    state = {
        newPrompt: ""
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
        return (<div className=""> 
                <InputGroup className="search-prompt-input">
                    {/* <FormControl maxLength="50" type="text" value={this.props.prompt} onChange={event => this.editPrompt(event.target.value)} /> */}
                    <FormControl
                        maxLength="50"
                        type="text"
                        value={this.state.newPrompt}
                        onChange={event => this.setState({newPrompt: event.target.value})}
                        // onChange={event => this.props.prompt = event.target.value}
                    />
                    <Button 
                        variant="outline-secondary" 
                        onClick={this.updatePrompt}>
                            Update
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
                            <Message msgId="search.promptslistlabel" />
                        </ControlLabel>
                        {this.getPrompts()}
                    </FormGroup>
                    
                    <Checkbox checked={override} onChange={this.toggleOverridePrompt}>
                        <Message msgId="search.overriedprompt" />
                    </Checkbox>
                </form>
            </div>
            );
    }

    // Search Service section

    edit = (s, idx) => {
        this.props.onPropertyChange("init_service_values", s);
        this.props.onPropertyChange("service", s);
        this.props.onPropertyChange("editIdx", idx);
        this.props.onPropertyChange("page", 1);
    };

    toggleOverride = () => {
        const {services, override} = this.props;
        this.props.onPropertyChange("textSearchConfig", {services, override: !override});
    };

    remove = (idx) => {
        const {services, override} = this.props;
        const newServices = services.filter((el, i) => i !== idx);
        this.props.onPropertyChange("textSearchConfig", {services: newServices, override});
    };

    // Search Prompt section

    getCurrentPrompt = () => {
        if (this.props.prompt !== "Search by location name") {
            return this.props.prompt;
        }
        return "Search by location name";
    };

    // editPrompt = (newPrompt) => {
    //     console.log(newPrompt);
    //     this.props.prompt = newPrompt;
    // }

    updatePrompt = () => {
        // this.props.onPromptUpdate("textSearchConfig", {prompt: this.state.newPrompt});
        console.log("SERVICELIST -> ", this.state.newPrompt)
        this.props.updateSearchPrompt(this.state.newPrompt);
    };

    toggleOverridePrompt = () => {
        const {prompt, override} = this.props;
        this.props.onPropertyChange("textSearchConfig", {prompt, override: !override});
    };
}

export default {Element: ServicesList, validate};
