import expect from 'expect';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ServicesList from '../ServicesList';

describe("test ServicesList component", () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('test ServicesList creation', () => {
        const tb = ReactDOM.render(<ServicesList.Element/>, document.getElementById("container"));
        expect(tb).toExist();
        const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(tb, "control-label");
        expect(labels.length).toBe(3);
    });

    it('test ServicesList with default prompt', () => {
        const tb = ReactDOM.render(<ServicesList.Element/>, document.getElementById("container"));
        expect(tb).toExist();
        const infos = ReactTestUtils.findRenderedDOMComponentWithClass(tb, "priority-info with-top-margin");
        expect(infos).toExist();
        const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(tb, "control-label");
        expect(labels.length).toBe(4);
        expect(labels[0].innerText).toBe("search.serviceslistlabel");
        expect(labels[1].innerText).toBe("search.overriedservice");
        expect(labels[2].innerText).toBe("search.custompromptlabel");
        const promptValue = document.getElementsByClassName('search-prompt-input').value;
        expect(promptValue).toBe("Search by location name");
    });

    it('test ServicesList changed prompt', () => {
        const testPrompt = "testPrompt";
        const tb = ReactDOM.render(<ServicesList.Element prompt={testPrompt}/>, document.getElementById("container"));
        expect(tb).toExist();
        const infos = ReactTestUtils.findRenderedDOMComponentWithClass(tb, "priority-info with-top-margin");
        expect(infos).toExist();
        const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(tb, "control-label");
        expect(labels.length).toBe(3);
        expect(labels[0].innerText).toBe("search.serviceslistlabel");
        expect(labels[1].innerText).toBe("search.overriedservice");
        expect(labels[2].innerText).toBe("search.custompromptlabel");
        const promptValue = document.getElementsByClassName('search-prompt-input').value;
        expect(promptValue).toBe("testPrompt");
    });

    it('test ServicesList clicking reset button', () => {
        const testPrompt = "testPrompt";
        const tb = ReactDOM.render(<ServicesList.Element prompt={testPrompt}/>, document.getElementById("container"));
        expect(tb).toExist();
        const infos = ReactTestUtils.findRenderedDOMComponentWithClass(tb, "priority-info with-top-margin");
        expect(infos).toExist();
        const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(tb, "control-label");
        expect(labels.length).toBe(3);
        expect(labels[0].innerText).toBe("search.serviceslistlabel");
        expect(labels[1].innerText).toBe("search.overriedservice");
        expect(labels[2].innerText).toBe("search.custompromptlabel");
        let promptValue = document.getElementsByClassName('search-prompt-input').value;
        expect(promptValue).toBe("testPrompt");

        const resetButton = document.getElementsByClassName('search-prompt-input-reset');
        expect(resetButton.length).toBe(1);
        ReactTestUtils.Simulate.click(resetButton);
        promptValue = document.getElementsByClassName('search-prompt-input').value;
        expect(promptValue).toBe("Search by location name");
    });
});
