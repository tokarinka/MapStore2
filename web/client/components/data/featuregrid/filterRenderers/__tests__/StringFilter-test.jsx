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
const StringFilter = require('../StringFilter');

const expect = require('expect');

describe('Test for StringFilter component', () => {
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
        ReactDOM.render(<StringFilter/>, document.getElementById("container"));
        const el = document.getElementsByClassName("form-control input-sm")[0];
        expect(el).toExist();
    });
    it('render with value', () => {
        ReactDOM.render(<StringFilter value={"TEST"}/>, document.getElementById("container"));
        const el = document.getElementsByClassName("form-control input-sm")[0];
        expect(el).toExist();
        expect(el.value).toBe("TEST");
    });
    it('Test StringFilter onChange', () => {
        const actions = {
            onChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<StringFilter onChange={actions.onChange} />, document.getElementById("container"));
        const input = document.getElementsByClassName("form-control input-sm")[0];
        input.value = "test";
        ReactTestUtils.Simulate.change(input);
        expect(spyonChange).toHaveBeenCalled();
    });
});
