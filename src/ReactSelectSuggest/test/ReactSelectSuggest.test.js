import test from 'tape';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { ReactSelectSuggest } from '../ReactSelectSuggest';
import sinon from 'sinon';
import * as ReactSelectSuggestActions from '../ReactSelectSuggestActions';
import defaultState from '../ReactSelectInitialState';

const createStateComponent = (props) => {
    if(!props) {
        props = {};
    }
    props.reduxComponent = false;

    const component = mount(
        <ReactSelectSuggest
                showAttr="title"
                url="myurl"
                {...props}/>
    );

    return component;
};

const createReduxComponent = (props) => {
    if(!props) {
        props = {};
    }

    if(!props.reactSelectReducer) {
        props.reactSelectReducer = defaultState;
    }

    props.actions = ReactSelectSuggestActions;
    props.reduxComponent = true;

    const component = mount(
        <ReactSelectSuggest
                showAttr="title"
                url="myurl"
                {...props}/>
    );
    return component;
};

const propsForInputWithResults = (props) => {
    return {
        reactSelectReducer : {
            inputValue: 'he',
            searchResults: [
                {
                    title : 'hell'
                },{
                    title: 'hello'
                }
            ],
            showDropDown: true,
            ...props
        }
    };
};

const getBasicComponentNodes = (component) => {
    const mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        dropDown = mainNode.find('.react-select-drop-down');
    
    return {
        mainNode : mainNode,
        mainInputNode : mainInputNode,
        inputField : mainInputNode.find('input'),
        inputAjaxLoader : mainInputNode.find('.react-select-ajax-loader'),
        placeHolder : mainInputNode.find('.react-select-placeholder'),
        dropDown : dropDown,
        selectBox : mainNode.find('.react-select-box'),
        selectedNode : mainNode.find('.react-select-selected'),
        dropDownElements : dropDown.find('li'),
        errorNode : mainNode.find('.react-select-box-errors')
    };
};

function resetSpies(fixtures) {
    for(const key in fixtures.spies) {
        fixtures.spies[key].reset();
    }
}

function restoreSpies(fixtures) {
    for(const key in fixtures.spies) {
        fixtures.spies[key].restore();
    }
}

const setupFixtures = () => {
    const fixtures = {
        spies : {
            showDropDownSpy : sinon.spy(ReactSelectSuggestActions, 'showDropDown'),
            hideDropDownSpy : sinon.spy(ReactSelectSuggestActions, 'hideDropDown'),
            showPlaceholderSpy : sinon.spy(ReactSelectSuggestActions, 'showPlaceholder'),
            hidePlaceholderSpy : sinon.spy(ReactSelectSuggestActions, 'hidePlaceholder'),
            searchForResultsSpy : sinon.spy(ReactSelectSuggestActions, 'searchForResults'),
            selectedItemSpy : sinon.spy(ReactSelectSuggestActions, 'selectItem'),
            changeInputSpy : sinon.spy(ReactSelectSuggestActions, 'changeInputValue'),
            clearSearchresultsSpy : sinon.spy(ReactSelectSuggestActions, 'clearSearchResults'),
            setFocusIndexSpy : sinon.spy(ReactSelectSuggestActions, 'setFocusIndex'),
            searchResultsSuccessSpy : sinon.spy(ReactSelectSuggestActions, 'searchResultsSuccess')
        }
    };
    return fixtures;
};

test('react-select-suggest markup generated correctly', (assert) => {
    const component = createReduxComponent({placeholder:'hello'}),
        { mainNode, mainInputNode, inputField, inputAjaxLoader, placeHolder, dropDown, selectBox } = getBasicComponentNodes(component);

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

test('placeholder field can be configured', (assert) => {
    const component = createReduxComponent(),
        { placeHolder } = getBasicComponentNodes(component);

    assert.equal(placeHolder.props().style.display,'none', 'placeholder should not be visible');

    component.setProps({
        placeholder : 'hi',
        reactSelectReducer: {
            showPlaceholder: true
        }
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeholder should now be visible');
    assert.equal(placeHolder.text(), 'hi', 'placeholder text correctly changed');
    assert.end();   
});

test('focus on input field will set showDropDown correctly and hide the placeholder', (assert) => {
    const component = createReduxComponent(),
        { inputField , placeHolder, dropDown } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { showDropDownSpy, hidePlaceholderSpy } = fixtures.spies;

    inputField.simulate('focus');
    assert.equal(showDropDownSpy.called, true, 'after focus on field showDropDown is true');
    assert.equal(hidePlaceholderSpy.called, true, 'after focus on field hidePlaceholder function is called');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            showPlaceholder: false,
            showDropDown: true
        }
    });
    assert.equal(placeHolder.props().style.display, 'none', 'placeholder should not be visible');
    assert.equal(dropDown.props().style.display, 'none', 'dropdown should not be visible because we have no results');

    restoreSpies(fixtures);
    assert.end();
});

test('blur on the inputfield will show the placeholder, but only if there is no inputvalue', (assert) => {
    const props = {
            reactSelectReducer : {
                showPlaceholder: false, 
                showDropDown: true,
                inputValue: ''
            }
        },
        component = createReduxComponent(props),
        { inputField } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { showPlaceholderSpy } = fixtures.spies;

    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, true, 'blur without inputvalue shows the placeholder');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            inputValue : 'ok'
        }
    });
    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, false, 'blur with inputvalue does not show the placeholder');
    
    restoreSpies(fixtures);
    assert.end();
});


test('dropdown should be hidden when no results found or the focus is lost', (assert) => {
    const component = createReduxComponent({inputValue: 'hello', searchResults: []}),
        { inputField, dropDown } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { hideDropDownSpy } = fixtures.spies;
    
    assert.equal(dropDown.props().style.display, 'none',
        'Dropdow is not visible when there are no results'
    );

    component.setProps(propsForInputWithResults());
    assert.equal(dropDown.props().style.display, 'block','Dropdow should now be visible');

    inputField.simulate('blur');
    assert.equal(hideDropDownSpy.called, true,
        'showDropDown should not be visible after blur event'
    );
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer: {
            ...component.props().reactSelectReducer,
            searchResults: [
                {
                    title : 'hell'
                },{
                    title: 'hello'
                }
            ],
            inputValue: 'hello',
            showDropDown: false
        }
    });

    assert.equal(dropDown.props().style.display, 'none',
        'Dropdow should be hidden after losing the focus from input'
    );

    restoreSpies(fixtures);
    assert.end(); 
});

test('when results found the drop down should be displayed', (assert) => {
    const component = createReduxComponent(propsForInputWithResults()),
        { dropDown, dropDownElements } = getBasicComponentNodes(component);

    assert.equal(dropDown.props().style.display, 'block', 'Dropdow is visible when inputValue finds results and showDropDown is true');
    assert.equal(dropDownElements.length, 2, 'Dropdow displays two results');
    assert.equal(dropDownElements.nodes[0].innerHTML, 'hell', 'Dropdow displays first result correctly');

    assert.end(); 
});

test('result can be configured', (assert) => {
    const component = createReduxComponent();

    assert.equal(component.props().showAttr, 'title', 'custom attribute enabled');

    component.setProps({
        showAttr: 'name'
    });

    assert.equal(component.props().showAttr, 'name', 'attribute changed to name');

    assert.end(); 
});

test('changing the input value is calling the ajax function correctly', (assert) => {
    const namespace = 'reducer1',
        props = {
            reactSelectReducer : {
                inputValue: ''
            },
            namespace : namespace
        },
        component = createReduxComponent(props),
        fixtures = setupFixtures(),
        { searchForResultsSpy } = fixtures.spies,
        newInput = 'a';

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            inputValue: newInput
        }
    });

    assert.equal(searchForResultsSpy.calledOnce, true, 'search function only called once');
    assert.equal(
        searchForResultsSpy.calledWith(
            namespace, 
            newInput, {
                url:'myurl', 
                showAttr: 'title'
        }), 
        true,
        'search function called with correct data'
    );

    restoreSpies(fixtures);
    assert.end(); 
});

test('clearing the input will clear the searchresult', (assert) => {
    const component = createReduxComponent(propsForInputWithResults()),
        { dropDown } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { clearSearchresultsSpy } = fixtures.spies;

    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            showDropDown: false,
            inputValue: ''
        }
    });

    assert.equal(clearSearchresultsSpy.called, true, 'clear input has been called');
    assert.equal(dropDown.props().style.display, 'none', 'dropdown should now be hidden');
    
    restoreSpies(fixtures);
    assert.end(); 
});

test('height and width are configurable', (assert) => {
    const component = createReduxComponent({boxWidth: '400', boxHeight:'200'}),
        { mainNode, inputField, dropDown } = getBasicComponentNodes(component);

    assert.equal(mainNode.props().style.width, '400px', 'main area has the correct width');
    assert.equal(inputField.props().style.width, '400px', 'input field has the correct width');
    assert.equal(dropDown.props().style.maxHeight, '200px', 'dropdown has the correct height');

    component.setProps({
        boxWidth : '500',
        boxHeight: '300'
    });

    assert.equal(mainNode.props().style.width, '500px', 'main area has the correct width');
    assert.equal(inputField.props().style.width, '500px', 'input field has the correct width');
    assert.equal(dropDown.props().style.maxHeight, '300px', 'dropdown has the correct height');

    assert.end();
});

test('width is calculated correctly', (assert) => {
    const component = createReduxComponent(),
        { mainNode, inputField, dropDown } = getBasicComponentNodes(component);

    component.instance().resizeInputWidth(170, 200);
    assert.equal(inputField.get(0).style.width, '200px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '200px', 'dropdown field has the correct width');

    component.instance().resizeInputWidth(210, 300);
    assert.equal(inputField.get(0).style.width, '300px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '300px', 'dropdown field has the correct width');

    component.setProps({
        boxWidth : '222'
    });

    component.instance().resizeInputWidth(226, 500);
    assert.equal(inputField.get(0).style.width, '222px', 'input field has the correct width');
    assert.equal(dropDown.get(0).style.width, '222px', 'dropdown field has the correct width');

    assert.end();
});

test('while it is fetching it display a loader', (assert) => {
    const component = createReduxComponent(),
        { inputAjaxLoader } = getBasicComponentNodes(component);
    
    assert.equal(inputAjaxLoader.props().style.display, 'none', 'Ajax loader should be hidden');

    component.setProps({
        reactSelectReducer : {
            fetching : true
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'block', 'Ajax loader should be visible');

    component.setProps({
        reactSelectReducer : {
            fetching : false
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'none', 'Ajax loader should be hidden again');

    assert.end();
});

test('error message is visible', (assert) => {
    const component = createReduxComponent(),
        { errorNode } = getBasicComponentNodes(component);

    assert.equal(errorNode.props().style.display, 'none', 'Error node should not be visible');

    component.setProps({
        reactSelectReducer : {
            error : 'An error occured'
        }
    });

    assert.equal(errorNode.props().style.display, 'block', 'Error node should be visible');
    assert.equal(errorNode.text(), 'An error occured', 'Error node contains correct error message');

    assert.end(); 
});

test('selectedItemChanged function can be used as callback', (assert) => {
    let check = '';
    const props = {
            reactSelectReducer : {},
            onSelectedChanged: function(val) {
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


test('removing the whole input will clear the selecteditem', (assert) => {
    let check = 'hello';
    const props = {
            ...propsForInputWithResults(),
            placeholder: '123',
            onSelectedChanged: function(val) {
                check = val;
            }
        },
        component = createReduxComponent(props),
        { placeHolder, dropDown, inputField, selectedNode } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { showPlaceholderSpy, selectedItemSpy } = fixtures.spies;

    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');
    assert.equal(placeHolder.props().style.display, 'none', 'placeHolder should be hidden');
    
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            inputValue : '',
            showPlaceholder: false,
            showDropDown: true
        }
    });
    
    inputField.simulate('blur');
    assert.equal(showPlaceholderSpy.called, true, 'showplaceholder should have been called');
    assert.equal(selectedItemSpy.called, true, 'selectedItem has been cleared');
    assert.equal(check, false, 'onSelecItem callback has been called after reset');
    
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            showPlaceholder: true,
            selectedItem: false
        }
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeHolder should be visible');
    assert.equal(selectedNode.props().style.display, 'none', 'no selected item, so it should be hidden');

    restoreSpies(fixtures);
    assert.end(); 
});

test('focus dropdown elements works', (assert) => {
    const component = createReduxComponent(propsForInputWithResults()),
        { dropDown,  dropDownElements } = getBasicComponentNodes(component);

    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');
    
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 0
        }
    });

    assert.equal(dropDownElements.at(0).props().className, 'even react-select-suggest-focus', 'first dropdown field has focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd', 'second dropdown field has not the focus class');
    
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 1
        }
    });

    assert.equal(dropDownElements.at(0).props().className, 'even', 'first dropdown field has not the focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd react-select-suggest-focus', 'second dropdown field has the focus class');
    
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : false
        }
    });

    assert.equal(dropDownElements.at(0).props().className, 'even', 'first dropdown field has not the focus class');
    assert.equal(dropDownElements.at(1).props().className, 'odd', 'second dropdown field has not the focus class');
    assert.end();
});

test('mouse or key events can set the focus', (assert) => {
    const namespace = 'reducer1',
        props = {
            ...propsForInputWithResults(),
            namespace : namespace
        },
        component = createReduxComponent(props),
        { dropDown,  dropDownElements } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { setFocusIndexSpy } = fixtures.spies;

    component.instance().mouseMoveCounter = 2;
    dropDownElements.at(0).simulate('mouseover');
    assert.equal(setFocusIndexSpy.calledWith(namespace, 0), true, 'setFocusIndex called after mouseover');
    resetSpies(fixtures);

    dropDownElements.at(1).simulate('mouseover');
    assert.equal(setFocusIndexSpy.calledWith(namespace, 1), true, 'setFocusIndex called after mouseover');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 1
        }
    });

    dropDown.simulate('keyDown', { keyCode: 38 });
    assert.equal(setFocusIndexSpy.calledWith(namespace, 0), true, 'setFocusIndex called after keydown event');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 0
        }
    });

    dropDown.simulate('keyDown', { keyCode: 40 });
    assert.equal(setFocusIndexSpy.calledWith(namespace, 1), true, 'setFocusIndex called after keydown event');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 1
        }
    });

    dropDown.simulate('keyDown', { keyCode: 40 });
    assert.equal(setFocusIndexSpy.notCalled, true, 'setFocusIndex not called if focusIndex is the last list item');
    
    restoreSpies(fixtures);
    assert.end();
});

test('ENTER on a focus element can select it', (assert) => {
    const namespace = 'reducer1',
        props = {
            ...propsForInputWithResults({focusIndex:false}),
            namespace : namespace
        },
        component = createReduxComponent(props),
        { dropDown,  dropDownElements } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { selectedItemSpy }  = fixtures.spies;
    
    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'he'), true, 'without focusIndex selectItems should be the inputvalue');
    resetSpies(fixtures);

    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : 1
        }
    });   
    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'hello'), true, 'item can be selected with pressing enter');
    
    restoreSpies(fixtures);
    assert.end();
});

test('ENTER on a focus element when inputvalue is empty will...', (assert) => {
    const namespace = 'reducer' ,
        component = createReduxComponent(),
        { dropDown, inputField } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { selectedItemSpy, hideDropDownSpy, showPlaceholderSpy} = fixtures.spies;

    component.setProps({
        namespace : namespace,
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : false,
            searchResults : [],
            inputValue : '',
            showDropDown: true
        }
    });

    dropDown.simulate('keyDown', { keyCode: 13 });

    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...reset the selectedItem');
    assert.equal(showPlaceholderSpy.calledWith(namespace), true, '...show the placeholder');
    assert.equal(hideDropDownSpy.calledWith(namespace), true, '...close the dropdown');
    
    restoreSpies(fixtures);
    assert.end();
});

test('when freeTextSelection is...', (assert) => {
    const namespace = 'reducer' ,
        component = createReduxComponent(propsForInputWithResults()),
        { dropDown, inputField } = getBasicComponentNodes(component),
        fixtures = setupFixtures(),
        { selectedItemSpy } = fixtures.spies;

    component.setProps({
        namespace : namespace,
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            focusIndex : false,
            inputValue : 'abc',
            showDropDown: true
        }
    });

    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, 'abc'), true, '...false, ENTER can set selectedItem to any text');
    resetSpies(fixtures);

    inputField.simulate('blur');
    assert.equal(selectedItemSpy.calledWith(namespace, 'abc'), true, '...false, BLUR can set selectedItem to be any text');
    resetSpies(fixtures);

    component.setProps({
        namespace : namespace,
        freeTextSelection: false,
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
        }
    });

    dropDown.simulate('keyDown', { keyCode: 13 });
    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...true, selectedItem will be false on ENTER');
    resetSpies(fixtures);

    inputField.simulate('blur');
    assert.equal(selectedItemSpy.calledWith(namespace, false), true, '...true, selectedItem will be false on BLUR');
    

    restoreSpies(fixtures);
    assert.end();
});


test('searchResults can be initialized as props', (assert) => {
    const namespace = 'reducer' ,
        items = [
            {
                title : '123'
            },
            {
                title: 'hi'
            }
        ],
        fixtures = setupFixtures(),
        { searchForResultsSpy, searchResultsSuccessSpy } = fixtures.spies,
        component = createReduxComponent({
            items: items,
            namespace: namespace
        }),
        { dropDown, inputField } = getBasicComponentNodes(component);

       
    assert.equal(searchResultsSuccessSpy.calledWith(namespace, items), true, 'searchResults are initialized');
    assert.equal(dropDown.props().style.display, 'none', 'drop down is not visible');

    resetSpies(fixtures);
    component.setProps({
        reactSelectReducer : {
            ...component.props().reactSelectReducer,
            showDropDown: true,
            searchResults: items
        }
    });

    inputField.get(0).value = 'h';
    inputField.simulate('change');

    const { dropDownElements } = getBasicComponentNodes(component); 
    assert.equal(dropDown.props().style.display, 'block', 'dropdown is visible');
    assert.equal(searchResultsSuccessSpy.calledWith(namespace, [{title: 'hi'}]), true, 'searchResults are filtered');

    restoreSpies(fixtures);
    assert.end();
});