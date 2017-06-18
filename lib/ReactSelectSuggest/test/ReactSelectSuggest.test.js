'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactSelectSuggest = require('../ReactSelectSuggest');

var _ReactSelectSuggest2 = _interopRequireDefault(_ReactSelectSuggest);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ReactSelectSuggestActions = require('../ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setup = function setup(props) {
    var fixtures = {};

    props.actions = ReactSelectSuggestActions;

    var componentWithoutPlaceholder = (0, _enzyme.mount)(_react2.default.createElement(_ReactSelectSuggest2.default, _extends({
        showAttr: 'title',
        url: 'https://jsonplaceholder.typicode.com/posts'
    }, props)));

    var component = (0, _enzyme.mount)(_react2.default.createElement(_ReactSelectSuggest2.default, _extends({
        placeholder: 'hello',
        showAttr: 'title',
        url: 'https://jsonplaceholder.typicode.com/posts'
    }, props)));

    var componentStyle = (0, _enzyme.mount)(_react2.default.createElement(_ReactSelectSuggest2.default, _extends({
        placeholder: 'hello',
        showAttr: 'title',
        url: 'https://jsonplaceholder.typicode.com/posts',
        boxHeight: '200',
        boxWidth: '400'
    }, props)));

    fixtures.componentWithoutPlaceholder = componentWithoutPlaceholder;
    fixtures.component = component;
    fixtures.componentStyle = componentStyle;
    return fixtures;
};

var teardown = function teardown(fixtures) {
    fixtures = {};
};

(0, _tape2.default)('react-select-suggest markup generated correctly', function (assert) {
    var props = {
        reactSelectSuggest: {}
    },
        fixture = setup(props),
        component = fixture.component,
        mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        inputField = mainInputNode.find('input'),
        inputAjaxLoader = mainInputNode.find('.react-select-ajax-loader'),
        placeHolder = mainInputNode.find('.react-select-placeholder'),
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        selectBox = mainNode.find('.react-select-box');

    assert.equal(mainNode.length > 0, true, 'Component rendered');
    assert.equal(mainInputNode.length > 0, true, 'main input area field rendered');
    assert.equal(inputField.length > 0, true, 'input field rendered');
    assert.equal(placeHolder.length > 0, true, 'placeholder should be available');
    assert.equal(placeHolder.text(), 'hello', 'placeholder correctly initialized');
    assert.equal(dropDown.props().style.display, 'none', 'Component has a drop down box which is not visible');
    assert.equal(selectBox.length > 0, true, 'Component has a select field');
    assert.equal(inputAjaxLoader.length > 0, true, 'Component has an ajax loader');

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('placeholder field can be configured', function (assert) {
    var props = {
        reactSelectSuggest: {}
    },
        fixture = setup(props),
        component = fixture.componentWithoutPlaceholder,
        placeHolder = component.find('.react-select-placeholder');

    assert.equal(placeHolder.props().style.display, 'none', 'placeholder should not be visible');

    component.setProps({
        placeholder: 'hi',
        reactSelectSuggest: {
            showPlaceholder: true
        }
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeholder should now be visible');
    assert.equal(placeHolder.text(), 'hi', 'placeholder text correctly changed');

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('focus is on input field will set showDropDown correctly', function (assert) {
    var emptyProps = {
        reactSelectSuggest: {}
    },
        fixture = setup(emptyProps),
        component = fixture.component,
        inputField = component.find('.react-select-suggest-input-main input');

    var showSpy = _sinon2.default.spy(component.props().actions, 'showDropDown');
    inputField.simulate('focus');

    assert.equal(showSpy.called, true, 'after focus on field showDropDown is true');

    showSpy.restore();
    assert.end();
});

(0, _tape2.default)('placeholder field should be empty when focus is on input field', function (assert) {
    var emptyProps = {
        reactSelectSuggest: {}
    },
        fixture = setup(emptyProps),
        component = fixture.component,
        inputField = component.find('.react-select-suggest-input-main input');

    var hideSpy = _sinon2.default.spy(component.props().actions, 'hidePlaceholder');
    inputField.simulate('focus');
    assert.equal(hideSpy.called, true, 'after focus on field placeholder should not be visible');
    hideSpy.restore();

    var showSpy = _sinon2.default.spy(component.props().actions, 'showPlaceholder');
    inputField.simulate('blur');
    assert.equal(showSpy.called, true, 'blur hides placeholder');
    showSpy.restore();

    showSpy = _sinon2.default.spy(component.props().actions, 'showPlaceholder');
    component.setProps({
        reactSelectSuggest: {
            inputValue: 'ok'
        }
    });
    inputField.simulate('blur');
    assert.equal(showSpy.called, false, 'blur does not show the placeholder if inputValue is set');
    showSpy.restore();

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('dropdown should be hidden when no results found or the focus is lost', function (assert) {
    var emptyProps = {
        reactSelectSuggest: {
            inputValue: 'hello',
            searchResults: []
        }
    },
        fixture = setup(emptyProps),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        inputField = component.find('.react-select-suggest-input-main input');

    assert.equal(dropDown.props().style.display, 'none', 'Dropdow is not visible when inputValue does not find results');

    component.setProps({
        reactSelectSuggest: {
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            inputValue: 'hello',
            showDropDown: true
        }
    });

    assert.equal(dropDown.props().style.display, 'block', 'Dropdow should now be visible');

    var hideDropDownSpy = _sinon2.default.spy(component.props().actions, 'hideDropDown');
    inputField.simulate('blur');
    assert.equal(hideDropDownSpy.called, true, 'showDropDown should now be false');

    component.setProps({
        reactSelectSuggest: {
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            inputValue: 'hello',
            showDropDown: false
        }
    });

    assert.equal(dropDown.props().style.display, 'none', 'Dropdow should be hidden after loosing the focus from input');

    hideDropDownSpy.restore();
    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('when results found the drop down should be displayed', function (assert) {
    var props = {
        reactSelectSuggest: {
            inputValue: 'hello',
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            showDropDown: true
        }
    },
        fixture = setup(props),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        dropDownElements = dropDown.find('li');

    assert.equal(dropDown.props().style.display, 'block', 'Dropdow is visible when inputValue finds results');
    assert.equal(dropDownElements.length, 2, 'Dropdow displays results');
    assert.equal(dropDownElements.nodes[0].innerHTML, 'hell', 'Dropdow displays first result');

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('result can be configured', function (assert) {
    var props = {
        reactSelectSuggest: {}
    },
        fixture = setup(props),
        component = fixture.component;

    assert.equal(component.props().showAttr, 'title', 'custom attribute enabled');

    component.setProps({
        showAttr: 'name'
    });

    assert.equal(component.props().showAttr, 'name', 'attribute changed to name');

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('changing the input value is calling the ajax function correctly', function (assert) {
    var emptyProps = {
        reactSelectSuggest: {
            inputValue: ''
        }
    },
        fixture = setup(emptyProps),
        component = fixture.component;

    var searchSpy = _sinon2.default.spy(ReactSelectSuggestActions, 'searchForResults');

    component.setProps({
        reactSelectSuggest: {
            inputValue: 'a'
        }
    });

    assert.equal(searchSpy.calledWith('a', {
        url: 'https://jsonplaceholder.typicode.com/posts',
        showAttr: 'title'
    }), true, 'search function called with correct data');

    searchSpy.restore();
    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('clearing the input will clear the searchresult', function (assert) {
    var props = {
        reactSelectSuggest: {
            inputValue: 'hello',
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            showDropDown: true
        }
    },
        fixture = setup(props),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down');

    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');

    var clearInputSpy = _sinon2.default.spy(ReactSelectSuggestActions, 'clearSearchResults');

    component.setProps({
        reactSelectSuggest: {
            inputValue: ''
        }
    });

    assert.equal(clearInputSpy.called, true, 'clear input has been called');

    clearInputSpy.restore();
    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('height and width are configurable', function (assert) {
    var props = {
        reactSelectSuggest: {}
    },
        fixture = setup(props),
        component = fixture.componentStyle,
        mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        inputField = mainInputNode.find('input'),
        dropDown = component.find('.react-select-suggest .react-select-drop-down');

    assert.equal(mainNode.props().style.width, '400px', 'main area has the correct width');
    assert.equal(inputField.props().style.width, '400px', 'input field has the correct width');
    assert.equal(dropDown.props().style.maxHeight, '200px', 'dropdown has the correct height');

    component.setProps({
        boxWidth: '500',
        boxHeight: '300'
    });

    assert.equal(mainNode.props().style.width, '500px', 'main area has the correct width');
    assert.equal(inputField.props().style.width, '500px', 'input field has the correct width');
    assert.equal(dropDown.props().style.maxHeight, '300px', 'dropdown has the correct height');

    assert.end();
});

(0, _tape2.default)('while it is fetching it display a loader', function (assert) {
    var props = {
        reactSelectSuggest: {
            inputValue: 'hello',
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            showDropDown: true
        }
    },
        fixture = setup(props),
        component = fixture.component,
        mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        inputAjaxLoader = mainInputNode.find('.react-select-ajax-loader');

    assert.equal(inputAjaxLoader.props().style.display, 'none', 'Ajax loader should be hidden');

    component.setProps({
        reactSelectSuggest: {
            fetching: true
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'block', 'Ajax loader should be visible');

    teardown(fixture);
    assert.end();
});

(0, _tape2.default)('error message is visible', function (assert) {
    var props = {
        reactSelectSuggest: {
            error: false
        }
    },
        fixture = setup(props),
        component = fixture.component,
        mainNode = component.find('.react-select-suggest'),
        errorNode = mainNode.find('.react-select-box-errors');

    assert.equal(errorNode.props().style.display, 'none', 'Error node should not be visible');

    component.setProps({
        reactSelectSuggest: {
            error: 'An error occured'
        }
    });

    assert.equal(errorNode.props().style.display, 'block', 'Error node should be visible');
    assert.equal(errorNode.text(), 'An error occured', 'Error node contains correct error message');

    teardown(fixture);
    assert.end();
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(teardown, 'teardown', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');
}();

;