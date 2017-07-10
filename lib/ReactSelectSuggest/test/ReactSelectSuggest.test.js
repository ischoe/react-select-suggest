'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactSelectSuggest = require('../ReactSelectSuggest');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ReactSelectSuggestActions = require('../ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

var _ReactSelectInitialState = require('../ReactSelectInitialState');

var _ReactSelectInitialState2 = _interopRequireDefault(_ReactSelectInitialState);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStateComponent = function createStateComponent(props) {
    if (!props) {
        props = {};
    }
    props.reduxComponent = false;

    var component = (0, _enzyme.mount)(_react2.default.createElement(_ReactSelectSuggest.ReactSelectSuggest, _extends({
        showAttr: 'title',
        url: 'myurl'
    }, props)));

    return component;
};

var createReduxComponent = function createReduxComponent(props) {
    if (!props) {
        props = {};
    }

    if (!props.reactSelectReducer) {
        props.reactSelectReducer = _ReactSelectInitialState2.default;
    }

    props.actions = ReactSelectSuggestActions;
    props.reduxComponent = true;

    var component = (0, _enzyme.mount)(_react2.default.createElement(_ReactSelectSuggest.ReactSelectSuggest, _extends({
        showAttr: 'title',
        url: 'myurl'
    }, props)));
    return component;
};

var propsForInputWithResults = function propsForInputWithResults(props) {
    return {
        reactSelectReducer: _extends({
            inputValue: 'he',
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            showDropDown: true
        }, props)
    };
};

var getBasicComponentNodes = function getBasicComponentNodes(component) {
    var mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        dropDown = mainNode.find('.react-select-drop-down');

    return {
        mainNode: mainNode,
        mainInputNode: mainInputNode,
        inputField: mainInputNode.find('input'),
        inputAjaxLoader: mainInputNode.find('.react-select-ajax-loader'),
        placeHolder: mainInputNode.find('.react-select-placeholder'),
        dropDown: dropDown,
        selectBox: mainNode.find('.react-select-box'),
        selectedNode: mainNode.find('.react-select-selected'),
        dropDownElements: dropDown.find('li'),
        errorNode: mainNode.find('.react-select-box-errors')
    };
};

function resetSpies(fixtures) {
    for (var key in fixtures.spies) {
        fixtures.spies[key].reset();
    }
}

function restoreSpies(fixtures) {
    for (var key in fixtures.spies) {
        fixtures.spies[key].restore();
    }
}

var setupFixtures = function setupFixtures() {
    var fixtures = {
        spies: {
            showDropDownSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'showDropDown'),
            hideDropDownSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'hideDropDown'),
            showPlaceholderSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'showPlaceholder'),
            hidePlaceholderSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'hidePlaceholder'),
            searchForResultsSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'searchForResults'),
            selectedItemSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'selectItem'),
            changeInputSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'changeInputValue'),
            clearSearchresultsSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'clearSearchResults'),
            setFocusIndexSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'setFocusIndex'),
            searchResultsSuccessSpy: _sinon2.default.spy(ReactSelectSuggestActions, 'searchResultsSuccess')
        }
    };
    return fixtures;
};

(0, _tape2.default)('react-select-suggest markup generated correctly', function (assert) {
    var component = createReduxComponent({ placeholder: 'hello' }),
        _getBasicComponentNod = getBasicComponentNodes(component),
        mainNode = _getBasicComponentNod.mainNode,
        mainInputNode = _getBasicComponentNod.mainInputNode,
        inputField = _getBasicComponentNod.inputField,
        inputAjaxLoader = _getBasicComponentNod.inputAjaxLoader,
        placeHolder = _getBasicComponentNod.placeHolder,
        dropDown = _getBasicComponentNod.dropDown,
        selectBox = _getBasicComponentNod.selectBox;


    assert.equal(mainNode.length > 0, true, 'Component rendered');
    assert.equal(mainInputNode.length > 0, true, 'main input area field rendered');
    assert.equal(inputField.length > 0, true, 'input field rendered');
    assert.equal(placeHolder.length > 0, true, 'placeholder should be available');
    assert.equal(placeHolder.text(), 'hello', 'placeholder correctly initialized');
    assert.equal(dropDown.props().style.display, 'none', 'Component has a drop down box which is not visible');
    assert.equal(selectBox.length > 0, true, 'Component has a select field');
    assert.equal(inputAjaxLoader.length > 0, true, 'Component has an ajax loader');
    assert.end();
});

(0, _tape2.default)('placeholder field can be configured', function (assert) {
    var component = createReduxComponent(),
        _getBasicComponentNod2 = getBasicComponentNodes(component),
        placeHolder = _getBasicComponentNod2.placeHolder;


    assert.equal(placeHolder.props().style.display, 'none', 'placeholder should not be visible');

    component.setProps({
        placeholder: 'hi',
        reactSelectReducer: {
            showPlaceholder: true
        }
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeholder should now be visible');
    assert.equal(placeHolder.text(), 'hi', 'placeholder text correctly changed');
    assert.end();
});

(0, _tape2.default)('focus on input field will set showDropDown correctly and hide the placeholder', function (assert) {
    var component = createReduxComponent(),
        _getBasicComponentNod3 = getBasicComponentNodes(component),
        inputField = _getBasicComponentNod3.inputField,
        placeHolder = _getBasicComponentNod3.placeHolder,
        dropDown = _getBasicComponentNod3.dropDown,
        fixtures = setupFixtures(),
        _fixtures$spies = fixtures.spies,
        showDropDownSpy = _fixtures$spies.showDropDownSpy,
        hidePlaceholderSpy = _fixtures$spies.hidePlaceholderSpy;


    inputField.simulate('focus');
    assert.equal(showDropDownSpy.called, true, 'after focus on field showDropDown is true');
    assert.equal(hidePlaceholderSpy.called, true, 'after focus on field hidePlaceholder function is called');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            showPlaceholder: false,
            showDropDown: true
        })
    });
    assert.equal(placeHolder.props().style.display, 'none', 'placeholder should not be visible');
    assert.equal(dropDown.props().style.display, 'none', 'dropdown should not be visible because we have no results');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('blur on the inputfield will show the placeholder, but only if there is no inputvalue', function (assert) {
    var props = {
        reactSelectReducer: {
            showPlaceholder: false,
            showDropDown: true,
            inputValue: ''
        }
    },
        component = createReduxComponent(props),
        _getBasicComponentNod4 = getBasicComponentNodes(component),
        inputField = _getBasicComponentNod4.inputField,
        fixtures = setupFixtures(),
        showPlaceholderSpy = fixtures.spies.showPlaceholderSpy;


    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, true, 'blur without inputvalue shows the placeholder');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            inputValue: 'ok'
        })
    });
    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, false, 'blur with inputvalue does not show the placeholder');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('dropdown should be hidden when no results found or the focus is lost', function (assert) {
    var component = createReduxComponent({ inputValue: 'hello', searchResults: [] }),
        _getBasicComponentNod5 = getBasicComponentNodes(component),
        inputField = _getBasicComponentNod5.inputField,
        dropDown = _getBasicComponentNod5.dropDown,
        fixtures = setupFixtures(),
        hideDropDownSpy = fixtures.spies.hideDropDownSpy;


    assert.equal(dropDown.props().style.display, 'none', 'Dropdow is not visible when there are no results');

    component.setProps(propsForInputWithResults());
    assert.equal(dropDown.props().style.display, 'block', 'Dropdow should now be visible');

    inputField.simulate('blur');
    assert.equal(hideDropDownSpy.called, true, 'showDropDown should not be visible after blur event');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            searchResults: [{
                title: 'hell'
            }, {
                title: 'hello'
            }],
            inputValue: 'hello',
            showDropDown: false
        })
    });

    assert.equal(dropDown.props().style.display, 'none', 'Dropdow should be hidden after losing the focus from input');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('when results found the drop down should be displayed', function (assert) {
    var component = createReduxComponent(propsForInputWithResults()),
        _getBasicComponentNod6 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod6.dropDown,
        dropDownElements = _getBasicComponentNod6.dropDownElements;


    assert.equal(dropDown.props().style.display, 'block', 'Dropdow is visible when inputValue finds results and showDropDown is true');
    assert.equal(dropDownElements.length, 2, 'Dropdow displays two results');
    assert.equal(dropDownElements.nodes[0].innerHTML, 'hell', 'Dropdow displays first result correctly');

    assert.end();
});

(0, _tape2.default)('result can be configured', function (assert) {
    var component = createReduxComponent();

    assert.equal(component.props().showAttr, 'title', 'custom attribute enabled');

    component.setProps({
        showAttr: 'name'
    });

    assert.equal(component.props().showAttr, 'name', 'attribute changed to name');

    assert.end();
});

(0, _tape2.default)('changing the input value is calling the ajax function correctly', function (assert) {
    var namespace = 'reducer1',
        props = {
        reactSelectReducer: {
            inputValue: ''
        },
        namespace: namespace
    },
        component = createReduxComponent(props),
        fixtures = setupFixtures(),
        searchForResultsSpy = fixtures.spies.searchForResultsSpy,
        newInput = 'a';


    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            inputValue: newInput
        })
    });

    assert.equal(searchForResultsSpy.calledOnce, true, 'search function only called once');
    assert.equal(searchForResultsSpy.calledWith(namespace, newInput, {
        url: 'myurl',
        showAttr: 'title'
    }), true, 'search function called with correct data');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('clearing the input will clear the searchresult', function (assert) {
    var component = createReduxComponent(propsForInputWithResults()),
        _getBasicComponentNod7 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod7.dropDown,
        fixtures = setupFixtures(),
        clearSearchresultsSpy = fixtures.spies.clearSearchresultsSpy;


    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            showDropDown: false,
            inputValue: ''
        })
    });

    assert.equal(clearSearchresultsSpy.called, true, 'clear input has been called');
    assert.equal(dropDown.props().style.display, 'none', 'dropdown should now be hidden');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('height and width are configurable', function (assert) {
    var component = createReduxComponent({ boxWidth: '400', boxHeight: '200' }),
        _getBasicComponentNod8 = getBasicComponentNodes(component),
        mainNode = _getBasicComponentNod8.mainNode,
        inputField = _getBasicComponentNod8.inputField,
        dropDown = _getBasicComponentNod8.dropDown;


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

(0, _tape2.default)('width is calculated correctly', function (assert) {
    var component = createReduxComponent(),
        _getBasicComponentNod9 = getBasicComponentNodes(component),
        mainNode = _getBasicComponentNod9.mainNode,
        inputField = _getBasicComponentNod9.inputField,
        dropDown = _getBasicComponentNod9.dropDown;


    component.instance().resizeInputWidth(170, 200);
    assert.equal(inputField.get(0).style.width, '200px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '200px', 'dropdown field has the correct width');

    component.instance().resizeInputWidth(210, 300);
    assert.equal(inputField.get(0).style.width, '300px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '300px', 'dropdown field has the correct width');

    component.setProps({
        boxWidth: '222'
    });

    component.instance().resizeInputWidth(226, 500);
    assert.equal(inputField.get(0).style.width, '222px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '222px', 'dropdown field has the correct width');

    assert.end();
});

(0, _tape2.default)('while it is fetching it display a loader', function (assert) {
    var component = createReduxComponent(),
        _getBasicComponentNod10 = getBasicComponentNodes(component),
        inputAjaxLoader = _getBasicComponentNod10.inputAjaxLoader;


    assert.equal(inputAjaxLoader.props().style.display, 'none', 'Ajax loader should be hidden');

    component.setProps({
        reactSelectReducer: {
            fetching: true
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'block', 'Ajax loader should be visible');

    component.setProps({
        reactSelectReducer: {
            fetching: false
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'none', 'Ajax loader should be hidden again');

    assert.end();
});

(0, _tape2.default)('error message is visible', function (assert) {
    var component = createReduxComponent(),
        _getBasicComponentNod11 = getBasicComponentNodes(component),
        errorNode = _getBasicComponentNod11.errorNode;


    assert.equal(errorNode.props().style.display, 'none', 'Error node should not be visible');

    component.setProps({
        reactSelectReducer: {
            error: 'An error occured'
        }
    });

    assert.equal(errorNode.props().style.display, 'block', 'Error node should be visible');
    assert.equal(errorNode.text(), 'An error occured', 'Error node contains correct error message');

    assert.end();
});

(0, _tape2.default)('selectedItemChanged function can be used as callback', function (assert) {
    var check = '';
    var props = {
        reactSelectReducer: {},
        onSelectedChanged: function onSelectedChanged(val) {
            check = val;
        }
    },
        component = createReduxComponent(props);

    component.instance().selectedItemChanged('test');
    assert.equal(check, 'test', 'onchange function has been called with test');

    component.instance().selectedItemChanged('hello');
    assert.equal(check, 'hello', 'onchange function has been called with hello');

    assert.end();
});

(0, _tape2.default)('removing the whole input will clear the selecteditem', function (assert) {
    var check = 'hello';
    var props = _extends({}, propsForInputWithResults(), {
        placeholder: '123',
        onSelectedChanged: function onSelectedChanged(val) {
            check = val;
        }
    }),
        component = createReduxComponent(props),
        _getBasicComponentNod12 = getBasicComponentNodes(component),
        placeHolder = _getBasicComponentNod12.placeHolder,
        dropDown = _getBasicComponentNod12.dropDown,
        inputField = _getBasicComponentNod12.inputField,
        selectedNode = _getBasicComponentNod12.selectedNode,
        fixtures = setupFixtures(),
        _fixtures$spies2 = fixtures.spies,
        showPlaceholderSpy = _fixtures$spies2.showPlaceholderSpy,
        selectedItemSpy = _fixtures$spies2.selectedItemSpy;


    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');
    assert.equal(placeHolder.props().style.display, 'none', 'placeHolder should be hidden');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            inputValue: '',
            showPlaceholder: false,
            showDropDown: true
        })
    });

    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, true, 'showplaceholder should have been called');
    assert.equal(selectedItemSpy.called, true, 'selectedItem has been cleared');
    assert.equal(check, false, 'onSelecItem callback has been called after reset');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            showPlaceholder: true,
            selectedItem: false
        })
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeHolder should be visible');
    assert.equal(selectedNode.props().style.display, 'none', 'no selected item, so it should be hidden');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('focus dropdown elements works', function (assert) {
    var component = createReduxComponent(propsForInputWithResults()),
        _getBasicComponentNod13 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod13.dropDown,
        dropDownElements = _getBasicComponentNod13.dropDownElements;


    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 0
        })
    });

    assert.equal(dropDownElements.at(0).props().className, 'even react-select-suggest-focus', 'first dropdown field has focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd', 'second dropdown field has not the focus class');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 1
        })
    });

    assert.equal(dropDownElements.at(0).props().className, 'even', 'first dropdown field has not the focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd react-select-suggest-focus', 'second dropdown field has the focus class');

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: false
        })
    });

    assert.equal(dropDownElements.at(0).props().className, 'even', 'first dropdown field has not the focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd', 'second dropdown field has not the focus class');
    assert.end();
});

(0, _tape2.default)('mouse or key events can set the focus', function (assert) {
    var namespace = 'reducer1',
        props = _extends({}, propsForInputWithResults(), {
        namespace: namespace
    }),
        component = createReduxComponent(props),
        _getBasicComponentNod14 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod14.dropDown,
        dropDownElements = _getBasicComponentNod14.dropDownElements,
        fixtures = setupFixtures(),
        setFocusIndexSpy = fixtures.spies.setFocusIndexSpy;


    component.instance().mouseMoveCounter = 2;
    dropDownElements.at(0).simulate('mouseover');
    assert.equal(setFocusIndexSpy.calledWith(namespace, 0), true, 'setFocusIndex called after mouseover');
    resetSpies(fixtures);

    dropDownElements.at(1).simulate('mouseover');
    assert.equal(setFocusIndexSpy.calledWith(namespace, 1), true, 'setFocusIndex called after mouseover');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 1
        })
    });

    dropDown.simulate('keyDown', { keyCode: 38 });
    assert.equal(setFocusIndexSpy.calledWith(namespace, 0), true, 'setFocusIndex called after keydown event');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 0
        })
    });

    dropDown.simulate('keyDown', { keyCode: 40 });
    assert.equal(setFocusIndexSpy.calledWith(namespace, 1), true, 'setFocusIndex called after keydown event');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 1
        })
    });

    dropDown.simulate('keyDown', { keyCode: 40 });
    assert.equal(setFocusIndexSpy.notCalled, true, 'setFocusIndex not called if focusIndex is the last list item');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('ENTER on a focus element can select it', function (assert) {
    var namespace = 'reducer1',
        props = _extends({}, propsForInputWithResults({ focusIndex: false }), {
        namespace: namespace
    }),
        component = createReduxComponent(props),
        _getBasicComponentNod15 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod15.dropDown,
        dropDownElements = _getBasicComponentNod15.dropDownElements,
        fixtures = setupFixtures(),
        selectedItemSpy = fixtures.spies.selectedItemSpy;


    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'he'), true, 'without focusIndex selectItems should be the inputvalue');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: 1
        })
    });
    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'hello'), true, 'item can be selected with pressing enter');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('ENTER on a focus element when inputvalue is empty will...', function (assert) {
    var namespace = 'reducer',
        component = createReduxComponent(),
        _getBasicComponentNod16 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod16.dropDown,
        inputField = _getBasicComponentNod16.inputField,
        fixtures = setupFixtures(),
        _fixtures$spies3 = fixtures.spies,
        selectedItemSpy = _fixtures$spies3.selectedItemSpy,
        hideDropDownSpy = _fixtures$spies3.hideDropDownSpy,
        showPlaceholderSpy = _fixtures$spies3.showPlaceholderSpy;


    component.setProps({
        namespace: namespace,
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: false,
            searchResults: [],
            inputValue: '',
            showDropDown: true
        })
    });

    dropDown.simulate('keyDown', { keyCode: 13 });

    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...reset the selectedItem');
    assert.equal(showPlaceholderSpy.calledWith(namespace), true, '...show the placeholder');
    assert.equal(hideDropDownSpy.calledWith(namespace), true, '...close the dropdown');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('when freeTextSelection is...', function (assert) {
    var namespace = 'reducer',
        component = createReduxComponent(propsForInputWithResults()),
        _getBasicComponentNod17 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod17.dropDown,
        inputField = _getBasicComponentNod17.inputField,
        fixtures = setupFixtures(),
        selectedItemSpy = fixtures.spies.selectedItemSpy;


    component.setProps({
        namespace: namespace,
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            focusIndex: false,
            inputValue: 'abc',
            showDropDown: true
        })
    });

    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'abc'), true, '...false, ENTER can set selectedItem to any text');
    resetSpies(fixtures);

    inputField.simulate('blur');
    assert.equal(selectedItemSpy.calledWith(namespace, 'abc'), true, '...false, BLUR can set selectedItem to be any text');
    resetSpies(fixtures);

    component.setProps({
        namespace: namespace,
        freeTextSelection: false,
        reactSelectReducer: _extends({}, component.props().reactSelectReducer)
    });

    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...true, selectedItem will be false on ENTER');
    resetSpies(fixtures);

    inputField.simulate('blur');
    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...true, selectedItem will be false on BLUR');

    restoreSpies(fixtures);
    assert.end();
});

(0, _tape2.default)('searchResults can be initialized as props', function (assert) {
    var namespace = 'reducer',
        items = [{
        title: '123'
    }, {
        title: 'hi'
    }],
        fixtures = setupFixtures(),
        _fixtures$spies4 = fixtures.spies,
        searchForResultsSpy = _fixtures$spies4.searchForResultsSpy,
        searchResultsSuccessSpy = _fixtures$spies4.searchResultsSuccessSpy,
        component = createReduxComponent({
        items: items,
        namespace: namespace
    }),
        _getBasicComponentNod18 = getBasicComponentNodes(component),
        dropDown = _getBasicComponentNod18.dropDown,
        inputField = _getBasicComponentNod18.inputField;


    assert.equal(searchResultsSuccessSpy.calledWith(namespace, items), true, 'searchResults are initialized');
    assert.equal(dropDown.props().style.display, 'none', 'drop down is not visible');

    resetSpies(fixtures);
    component.setProps({
        reactSelectReducer: _extends({}, component.props().reactSelectReducer, {
            showDropDown: true,
            searchResults: items
        })
    });

    inputField.get(0).value = 'h';
    inputField.simulate('change');

    var _getBasicComponentNod19 = getBasicComponentNodes(component),
        dropDownElements = _getBasicComponentNod19.dropDownElements;

    assert.equal(dropDown.props().style.display, 'block', 'dropdown is visible');
    assert.equal(searchResultsSuccessSpy.calledWith(namespace, [{ title: 'hi' }]), true, 'searchResults are filtered');

    restoreSpies(fixtures);
    assert.end();
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(createStateComponent, 'createStateComponent', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(createReduxComponent, 'createReduxComponent', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(propsForInputWithResults, 'propsForInputWithResults', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(getBasicComponentNodes, 'getBasicComponentNodes', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(resetSpies, 'resetSpies', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(restoreSpies, 'restoreSpies', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');

    __REACT_HOT_LOADER__.register(setupFixtures, 'setupFixtures', 'src/ReactSelectSuggest/test/ReactSelectSuggest.test.js');
}();

;