import test from 'tape';
import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactSelectSuggest from '../ReactSelectSuggest';
import sinon from 'sinon';
import * as ReactSelectSuggestActions from '../ReactSelectSuggestActions';

const setup = (props) => {
    const fixtures = {};

    props.actions = ReactSelectSuggestActions;

    const componentWithoutPlaceholder = mount(
        <ReactSelectSuggest
        showAttr="title"
        url="https://jsonplaceholder.typicode.com/posts"
        {...props}/>
    );

    const component = mount(
        <ReactSelectSuggest
        placeholder="hello"
        showAttr="title"
        url="https://jsonplaceholder.typicode.com/posts"
        {...props}/>
    );

    const componentStyle = mount(
        <ReactSelectSuggest
        placeholder="hello"
        showAttr="title"
        url="https://jsonplaceholder.typicode.com/posts"
        boxHeight="200"
        boxWidth="400"
        {...props}/>
    );

    fixtures.componentWithoutPlaceholder = componentWithoutPlaceholder;
    fixtures.component = component;
    fixtures.componentStyle = componentStyle;
    return fixtures;
};

const teardown = (fixtures) => {
    fixtures = {};
};

test('react-select-suggest markup generated correctly', (assert) => {
    const props = {
            reactSelectSuggest : {}
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

test('placeholder field can be configured', (assert) => {
    const props = {
            reactSelectSuggest : {}
        },
        fixture = setup(props),
        component = fixture.componentWithoutPlaceholder,
        placeHolder = component.find('.react-select-placeholder');

    assert.equal(placeHolder.props().style.display,'none', 'placeholder should not be visible');

    component.setProps({
        placeholder : 'hi',
        reactSelectSuggest: {
            showPlaceholder: true
        }
    });

    assert.equal(placeHolder.props().style.display, 'block', 'placeholder should now be visible');
    assert.equal(placeHolder.text(), 'hi', 'placeholder text correctly changed');

    teardown(fixture);
    assert.end();   
});

test('focus is on input field will set showDropDown correctly', (assert) => {
    const emptyProps = {
            reactSelectSuggest : {}
        },
        fixture = setup(emptyProps),
        component = fixture.component,
        inputField = component.find('.react-select-suggest-input-main input');

    let showSpy = sinon.spy(component.props().actions, 'showDropDown');
    inputField.simulate('focus');    

    assert.equal(showSpy.called, true, 'after focus on field showDropDown is true');

    showSpy.restore();
    assert.end();
});

test('placeholder field should be empty when focus is on input field', (assert) => {
    const emptyProps = {
            reactSelectSuggest : {}
        },
        fixture = setup(emptyProps),
        component = fixture.component,
        inputField = component.find('.react-select-suggest-input-main input');   

    let hideSpy = sinon.spy(component.props().actions, 'hidePlaceholder');
    inputField.simulate('focus');
    assert.equal(hideSpy.called, true, 'after focus on field placeholder should not be visible');
    hideSpy.restore();
    
    
    let showSpy = sinon.spy(component.props().actions, 'showPlaceholder');
    inputField.simulate('blur');
    assert.equal(showSpy.called, true, 'blur hides placeholder');
    showSpy.restore();

    showSpy = sinon.spy(component.props().actions, 'showPlaceholder');
    component.setProps({
        reactSelectSuggest : {
            inputValue : 'ok'
        }
    });
    inputField.simulate('blur');
    assert.equal(showSpy.called, false, 'blur does not show the placeholder if inputValue is set');
    showSpy.restore();
    
    teardown(fixture);
    assert.end();
});

test('dropdown should be hidden when no results found or the focus is lost', (assert) => {
    const emptyProps = {
            reactSelectSuggest : {
                inputValue: 'hello',
                searchResults: []
            }
        },
        fixture = setup(emptyProps),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        inputField = component.find('.react-select-suggest-input-main input');
    
    assert.equal(dropDown.props().style.display, 'none',
        'Dropdow is not visible when inputValue does not find results'
    );

    component.setProps({
        reactSelectSuggest: {
            searchResults: [
                {
                    title : 'hell'
                },{
                    title: 'hello'
                }
            ],
            inputValue: 'hello',
            showDropDown: true
        }
    });

    assert.equal(dropDown.props().style.display, 'block',
        'Dropdow should now be visible'
    );

    let hideDropDownSpy = sinon.spy(component.props().actions, 'hideDropDown');
    inputField.simulate('blur');
    assert.equal(hideDropDownSpy.called, true,
        'showDropDown should now be false'
    );

    component.setProps({
        reactSelectSuggest: {
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
        'Dropdow should be hidden after loosing the focus from input'
    );

    hideDropDownSpy.restore();
    teardown(fixture);
    assert.end(); 
});

test('when results found the drop down should be displayed', (assert) => {
    const props = {
            reactSelectSuggest : {
                inputValue: 'hello',
                searchResults: [
                    {
                        title : 'hell'
                    },{
                        title: 'hello'
                    }
                ],
                showDropDown: true
            }
        },
        fixture = setup(props),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        dropDownElements = dropDown.find('li');

    assert.equal(dropDown.props().style.display, 'block', 'Dropdow is visible when inputValue finds results');
    assert.equal(dropDownElements.length, 2, 'Dropdow displays results');
    assert.equal(dropDownElements.nodes[0].innerHTML, 'hell','Dropdow displays first result');

    teardown(fixture);
    assert.end(); 
});

test('result can be configured', (assert) => {
    const props = {
            reactSelectSuggest : {}
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

test('changing the input value is calling the ajax function correctly', (assert) => {
    const emptyProps = {
            reactSelectSuggest : {
                inputValue: ''
            }
        },
        fixture = setup(emptyProps),
        component = fixture.component;

    const searchSpy = sinon.spy(ReactSelectSuggestActions, 'searchForResults');

    component.setProps({
        reactSelectSuggest : {
            inputValue: 'a'
        }
    });

    assert.equal(
        searchSpy.calledWith('a', 
            {
                url:'https://jsonplaceholder.typicode.com/posts', 
                showAttr: 'title'
            }
        ), 
        true,
        'search function called with correct data'
    );

    searchSpy.restore();
    teardown(fixture);
    assert.end(); 
});

test('clearing the input will clear the searchresult', (assert) => {
    const props = {
            reactSelectSuggest : {
                inputValue: 'hello',
                searchResults: [
                    {
                        title : 'hell'
                    },{
                        title: 'hello'
                    }
                ],
                showDropDown: true
            }
        },
        fixture = setup(props),
        component = fixture.component,
        dropDown = component.find('.react-select-suggest .react-select-drop-down');

    assert.equal(dropDown.props().style.display, 'block', 'dropdown should be visible');

    const clearInputSpy = sinon.spy(ReactSelectSuggestActions, 'clearSearchResults');

    component.setProps({
        reactSelectSuggest : {
            inputValue: ''
        }
    });

    assert.equal(clearInputSpy.called, true, 'clear input has been called');
    
    clearInputSpy.restore();
    teardown(fixture);
    assert.end(); 
});

test('height and width are configurable', (assert) => {
    const props = {
            reactSelectSuggest : {}
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
        boxWidth : '500',
        boxHeight: '300'
    });

    assert.equal(mainNode.props().style.width, '500px', 'main area has the correct width');
    assert.equal(inputField.props().style.width, '500px', 'input field has the correct width');
    assert.equal(dropDown.props().style.maxHeight, '300px', 'dropdown has the correct height');

    assert.end();
});

test('while it is fetching it display a loader', (assert) => {
    const props = {
            reactSelectSuggest : {
                inputValue: 'hello',
                searchResults: [
                    {
                        title : 'hell'
                    },{
                        title: 'hello'
                    }
                ],
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
        reactSelectSuggest : {
            fetching : true
        }
    });

    assert.equal(inputAjaxLoader.props().style.display, 'block', 'Ajax loader should be visible');

    teardown(fixture);
    assert.end();
});

/*
test('clicked value should be shown in input field', (assert) => {
    const props = {
            reactSelectSuggest : {
                inputValue: 'hello',
                searchResults: [
                    {
                        title : 'hell'
                    },{
                        title: 'hello'
                    }
                ],
                showDropDown: true
            }
        },
        fixture = setup(props),
        component = fixture.component,
        mainNode = component.find('.react-select-suggest'),
        mainInputNode = mainNode.find('.react-select-suggest-input-main'),
        inputSelectedField = mainInputNode.find('.react-select-selected'),
        inputField = mainInputNode.find('input'),
        dropDown = component.find('.react-select-suggest .react-select-drop-down'),
        dropDownElements = dropDown.find('li');

    assert.equal(inputField.props().style.display, 'block', 'input field should be visible');
    assert.equal(inputSelectedField.props().style.display, 'none', 'input-selected field should be hidden');
    
    dropDownElements.first().simulate('click');
    
    assert.equal(inputField.props().style.display, 'none', 'input field should be hidden');
    assert.equal(inputSelectedField.props().style.display, 'block', 'input-selected field should be visible');

    teardown(fixture);
    assert.end(); 
});
*/