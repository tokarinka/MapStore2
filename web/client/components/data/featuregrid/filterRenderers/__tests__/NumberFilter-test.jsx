 /**
  * Copyright 2017, GeoSolutions Sas.
  * All rights reserved.
  *
  * This source code is licensed under the BSD-style license found in the
  * LICENSE file in the root directory of this source tree.
  */
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const NumberFilter = require('../NumberFilter');
const expect = require('expect');

describe('Test for NumberFilter component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('render with defaults', () => {
        ReactDOM.render(<NumberFilter/>, document.getElementById("container"));
        const el = document.getElementsByClassName("form-control input-sm")[0];
        expect(el).toExist();
    });
    it('render with value', () => {
        ReactDOM.render(<NumberFilter value={1}/>, document.getElementById("container"));
        const el = document.getElementsByClassName("form-control input-sm")[0];
        expect(el).toExist();
        const input = document.getElementsByTagName("input")[0];
        expect(input.value).toBe("1");
    });
    it('Test NumberFilter onChange', () => {
        const actions = {
            onChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<NumberFilter onChange={actions.onChange} />, document.getElementById("container"));

        const input = document.getElementsByTagName("input")[0];
        input.value = "> 2";
        ReactTestUtils.Simulate.change(input);
        expect(spyonChange).toHaveBeenCalled();
    });
    it('Test NumberFilter expression', () => {
        const actions = {
            onChange: () => {},
            onValueChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        const spyonValueChange = expect.spyOn(actions, 'onValueChange');
        ReactDOM.render(<NumberFilter onChange={actions.onChange} onValueChange={actions.onValueChange} />, document.getElementById("container"));

        const input = document.getElementsByTagName("input")[0];
        input.value = "> 2";
        ReactTestUtils.Simulate.change(input);
        const args = spyonChange.calls[0].arguments[0];
        expect(args.value).toBe(2);
        expect(args.operator).toBe(">");
        expect(spyonValueChange).toHaveBeenCalled();
        expect(spyonValueChange).toHaveBeenCalledWith("> 2");
        input.value = "< 2";
        ReactTestUtils.Simulate.change(input);
        const args2 = spyonChange.calls[1].arguments[0];
        expect(args2.value).toBe(2);
        expect(args2.operator).toBe("<");
    });
});
