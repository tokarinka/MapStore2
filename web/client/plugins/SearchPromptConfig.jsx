import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import {get} from 'lodash';
import { toggleControl } from '../actions/controls';
import Message from './locale/Message';
import { setSearchConfigPrompt, updateSearchPrompt, restServiceConfigPrompt } from '../actions/searchconfig';
import PromptsList from '../components/mapcontrols/searchpromptconfig/PromptsList.jsx';
import ResultsPrompts from '../components/mapcontrols/searchpromptconfig/ResultsPrompts';
import ButtonMisc from '../components/misc/Button';
import tooltip from '../components/misc/enhancers/tooltip';
import { createPlugin } from '../utils/PluginsUtils';
import searchconfigReducer from '../reducers/searchconfig';


const Button = tooltip(ButtonMisc);


class SearchPromptConfigPanel extends React.Component {
    static propTypes = {
        zoom: PropTypes.number
    };

    static defaultProps = {
        id: "search-prompt-config-editor",
        enabled: true,
        panelStyle: {
            minWidth: "400px",
            zIndex: 2000,
            position: "absolute",
            // overflow: "auto",
            top: "100px",
            minHeight: "300px",
            left: "calc(50% - 150px)",
            backgroundColor: "white"
        },
        panelClassName: "toolbar-panel",
        containerClassName: '',
        closeGlyph: "1-close",
        // titleText: <Message msgId="search.configpaneltitle" />,
        closePanel: () => {},
        onPropertyChange: () => {},
        page: 0,
        newService: {
            type: "wfs",
            name: "",
            displayName: "",
            subTitle: "",
            priority: 1,
            options: {
                url: "",
                typeName: "",
                queriableAttributes: "",
                sortBy: "",
                maxFeatures: 5,
                srsName: "EPSG:4326"}
        }
    };

    // canProceed = () => {};

    // isDirty = () => {};

    // renderFooter = () => {};

    // render() {
    //     const style = {position: "absolute", top: "100px", left: "100px", zIndex: 1000000};
    //     return <div style={style}>Zoom: {this.props.zoom}</div>;
    // }

    // onClose = () => {};

    // addPrompt = () => {};

    // prev = () => {
    //     const {page} = this.props;
    //     if (page > 1) {
    //         this.props.onPropertyChange("page", page - 1);
    //     } else if (page === 1 ) {
    //         this.props.restServiceConfig(0);
    //     }
    // };

    // next = () => {
    //     const {page, pages} = this.props;
    //     if (page < pages.length - 1) {
    //         this.props.onPropertyChange("page", page + 1);
    //     }
    // };

    // update = () => {
    //     const {service, editIdx} = this.props;
    //     this.props.updateService(service, editIdx);
    // };

}

const SearchPromptConfigPlugin = connect(({controls = {}, promptconfig = {}}) => ({
    enabled: controls.searchpromptconfig && controls.searchpromptconfig.enabled || false,
    pages: [PromptsList, ResultsPrompts],
    page: promptconfig && promptconfig.page || 0,
    service: promptconfig && promptconfig.service,
    initServiceValues: promptconfig && promptconfig.init_service_values,
    textSearchConfig: promptconfig && promptconfig.textSearchConfig,
    editIdx: promptconfig && promptconfig.editIdx
}), {
    toggleControl,
    onPropertyChange: setSearchConfigPrompt,
    restServiceConfigPrompt,
    updateSearchPrompt})(SearchPromptConfigPanel);


function SearchPromptButton({
    activeTool,
    enabled,
    onToggleControl
}) {
    if (activeTool === 'addressSearch') {
        return (<Button
            bsStyle="default"
            pullLeft
            className="square-button-md no-border"
            tooltipId="search.searchpromptbutton"
            tooltipPosition="bottom"
            onClick={() => {
                if (!enabled) {
                    onToggleControl('searchpromptconfig');
                }
            }}
        >
            <Glyphicon glyph="camera"/>
        </Button>);
    }

    return null;
}

const ConnectedSearchPromptConfigButton = connect(
    createSelector([
        state => state.search || null,
        state => state?.controls?.searchpromptconfig?.enabled || false
    ], (searchState, enabled) => ({
        activeTool: get(searchState, 'activeSearchTool', 'addressSearch'),
        enabled
    })),
    {
        onToggleControl: toggleControl
    }
)(SearchPromptButton);

export default createPlugin('SearchPromptConfig', {
    component: SearchPromptConfigPlugin,
    containers: {
        SearchPrompt: {
            name: 'SearchPromptConfigButton',
            target: 'button',
            component: ConnectedSearchPromptConfigButton
        }
    },
    reducers: {
        searchconfig: searchconfigReducer
    }
});
