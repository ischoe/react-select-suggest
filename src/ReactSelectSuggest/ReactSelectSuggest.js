import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './ReactSelectSuggestBasic.css';
import ajaxLoader from './ajax-loader.gif';
import * as ReactSelectSuggestActions from './ReactSelectSuggestActions';
import defaultState from './ReactSelectInitialState';
import ReactSelectSuggestItem from './ReactSelectSuggestItem';

export class ReactSelectSuggest extends Component {
    constructor (props) {
        super(props);

        if(!this.props.reduxComponent) {
            this.state = defaultState;
        }

        this.handleSelectedClick = this.handleSelectedClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleMouseOverItem = this.handleMouseOverItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClickArrow = this.handleClickArrow.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.mouseMoveCounter = 0;
        this.inputFieldSelectedAfterReopen = false;
    }

    componentWillMount() {
        if(typeof this.props.items !== 'undefined') {
            this.setStateOrReduxAction({searchResults: this.props.items});
        }
    }

    componentDidMount () {
        const { inputField, mainBox } = this.refs,
            { offsetWidth: inputOffset } = inputField,
            { offsetWidth: mainOffset } = mainBox;

        this.resizeInputWidth(inputOffset, mainOffset);
    }

    componentDidUpdate(prevProps, prevState) {
        const { reduxComponent, freeTextSelection, items, showAttr } = this.props,
            { inputValue, selectedItem, showDropDown, resetSelected, focusIndex } = this.getFromStateOrReduxProps(),
            { inputField, dropDown } = this.refs,
            prevInput = reduxComponent ? prevProps.reactSelectReducer.inputValue : prevState.inputValue;
        
        if(typeof items === 'undefined') {
            this.searchForResults(inputValue, prevInput);
        }

        if(showDropDown && dropDown.offsetWidth > 0) {
            const offset = inputField.offsetWidth - dropDown.offsetWidth;
            if(offset > 0) {
                dropDown.style.width = (parseInt(dropDown.style.width) + offset) + 'px';
            }
        }
        
        if(this.inputFieldSelectedAfterReopen) {
            inputField.select();
            this.inputFieldSelectedAfterReopen = false;
        }

        if(focusIndex !== false && this.mouseMoveCounter === 0) {
            const prevFocusIndex = reduxComponent ? prevProps.reactSelectReducer.focusIndex : prevState.focusIndex;

            if(prevFocusIndex !== focusIndex) {
                const focusElementTop = dropDown.getElementsByClassName('react-select-suggest-focus')[0];
                if(focusElementTop && focusElementTop.offsetTop > dropDown.offsetHeight/2) {
                    dropDown.scrollTop = focusElementTop.offsetTop - dropDown.offsetHeight/2;
                }
            }
        }
    }

    searchForResults(inputValue, prevInput) {
        const { reduxComponent, namespace, actions } = this.props;
        if(reduxComponent) {
            if(prevInput !== inputValue) {
                if(inputValue && inputValue.length > 0) {
                    actions.searchForResults(namespace, inputValue, this.buildRequestData());
                } else {
                    actions.clearSearchResults(namespace);
                }
            }
        } else {
            if(prevInput !== inputValue) {
                if(inputValue && inputValue.length > 0) {
                    this.setState({
                        fetching: true
                    });
                    this.fetchResults(inputValue, this.buildRequestData());
                } else {
                    this.setState({
                        searchResults: []
                    });
                }
            }
        }
    }

    resizeInputWidth(inputOffset, mainOffset) {
        const { boxWidth } = this.props,
            { inputField, dropDown } = this.refs,
            boxWidthValue = parseInt(boxWidth);

        if (boxWidth) {
            inputField.style.width = boxWidthValue + 'px';
            dropDown.style.width = boxWidthValue + 'px';

            if(inputField.offsetWidth > boxWidthValue) {
                this.checkWidthAfterResize(boxWidthValue, inputField, dropDown);
            }
        } else {
            inputField.style.width = mainOffset + 'px';
            dropDown.style.width = mainOffset + 'px';
            if(inputField.offsetWidth > mainOffset) {
                this.checkWidthAfterResize(mainOffset, inputField, dropDown);
            }
        }
    }

    checkWidthAfterResize(mainWidth, inputField, dropDown) {
        const offset = inputField.offsetWidth - mainWidth;
        inputField.style.width = (parseInt(inputField.style.width) - offset) + 'px';
        dropDown.style.width = (parseInt(inputField.style.width) - offset) + 'px';
    }

    getFromStateOrReduxProps() {
        const { reactSelectReducer, reduxComponent } = this.props;
        return reduxComponent ? reactSelectReducer : this.state;
    }

    setStateOrReduxAction(state) {
        const { reduxComponent, namespace, actions } = this.props;
        if(reduxComponent) {
            const { 
                focusIndex,
                showPlaceholder,
                showDropDown,
                selectedItem,
                inputValue,
                searchResults
            } = state;
            if(typeof focusIndex !== 'undefined') actions.setFocusIndex(namespace, focusIndex);
            if(typeof showPlaceholder !== 'undefined' && showPlaceholder === false) actions.hidePlaceholder(namespace);
            if(typeof showPlaceholder !== 'undefined' && showPlaceholder === true) actions.showPlaceholder(namespace);
            if(typeof showDropDown !== 'undefined' && showDropDown === true) actions.showDropDown(namespace);
            if(typeof showDropDown !== 'undefined' && showDropDown === false) actions.hideDropDown(namespace);
            if(typeof selectedItem !== 'undefined') actions.selectItem(namespace, selectedItem);
            if(typeof inputValue !== 'undefined') actions.changeInputValue(namespace, inputValue);
            if(typeof searchResults !== 'undefined') actions.searchResultsSuccess(namespace, searchResults);
        } else {
            this.setState({
                ...state
            });
        }
    }

    fetchResults(inputValue, sendData) {
        const self = this;
        return axios.get(sendData.url)
            .then(result =>  result.data)
            .then(data =>  data.filter(item => item[sendData.showAttr].includes(inputValue)))
            .then(returnResults =>  {
                self.setState({
                    fetching: false,
                    searchResults: returnResults
                });
            })
            .catch(error => {
                self.setState({
                    fetching: false,
                    error: error.message
                });
            });
    }

    enableFocus() {
        this.setStateOrReduxAction({showPlaceholder: false, showDropDown: true});
    }

    closeDropDown() {
        const { reduxComponent, freeTextSelection } = this.props,
            { inputValue, selectedItem, showDropDown } = this.getFromStateOrReduxProps();

        if(showDropDown !== false) {
            if(inputValue.length === 0) {
                if(selectedItem) {
                    this.selectItem(selectedItem);
                } else {
                    this.selectItem(false);
                }
            } else {
                if(freeTextSelection === false) {
                    if(selectedItem) {
                        this.selectItem(selectedItem);
                    } else {
                        this.selectItem(false);
                    }
                } else {
                    if(selectedItem) {
                        this.selectItem(selectedItem);
                    } else {
                        this.selectItem(inputValue);
                    }
                }
            }
        }
    }

    handleFocus(e) {
        this.enableFocus();
    }

    handleClick(e) {
        this.enableFocus();
    }

    handleClear() {
        this.selectItem(false);
    }

    handleClickArrow() {
        const { inputField } = this.refs, 
            { showDropDown } = this.getFromStateOrReduxProps();
        if(showDropDown) {
            this.closeDropDown();
        } else {
            this.enableFocus();
            this.inputFieldSelectedAfterReopen = true;
        }
    }

    handleMouseLeave() {
        const { showDropDown} = this.getFromStateOrReduxProps();
        if(showDropDown === true) {
            this.setStateOrReduxAction({focusIndex: false});
        }
    }

    selectedItemChanged(val) {
        const { onSelectedChanged } = this.props;
        if(onSelectedChanged) {
            onSelectedChanged(val);
        }
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode,
            { showAttr, freeTextSelection } = this.props,
            { inputField } = this.refs,
            { focusIndex, searchResults, inputValue } = this.getFromStateOrReduxProps(),
            maxLen = searchResults && searchResults.length - 1;
  
        if(keyCode === 38) {
            if(focusIndex === false) {
                this.handleKeyBoardFocus(maxLen);
            } else if(focusIndex - 1 >= 0) {
                this.handleKeyBoardFocus(focusIndex - 1);
            }
        } else if(keyCode === 40) {
            if(focusIndex === false) {
                this.handleKeyBoardFocus(0);
            } else if(focusIndex + 1 <= maxLen) {
                this.handleKeyBoardFocus(focusIndex + 1);
            }
        } else if(keyCode === 13) {
            if(focusIndex !== false && searchResults.length > 0) {
                this.selectItem(searchResults[focusIndex][showAttr]);
            } else {
                if(inputValue.length > 0 && freeTextSelection !== false) {
                    this.selectItem(inputValue);
                } else {
                    this.setStateOrReduxAction({selectedItem: false, showDropDown: false, showPlaceholder: true});
                    this.selectItem('');
                    inputField.blur();
                }
            }
        }
    }

    handleKeyBoardFocus(index) {
        this.mouseMoveCounter = 0;
        this.handleItemFocus(index);
    }

    handleMouseMove(index) {
        this.mouseMoveCounter++;
        if(this.mouseMoveCounter === 2) {
            this.handleItemFocus(index);
        }
    }

    handleMouseOverItem(index) {
        if(this.mouseMoveCounter > 1) {
            this.handleItemFocus(index);
        }
    }

    handleItemFocus(index) {
        this.setStateOrReduxAction({focusIndex : index});
    }

    selectItem(val) {
        const addProps = {},
            { inputValue, selectedItem } = this.getFromStateOrReduxProps(),
            { items, showAttr } = this.props;
        if(val === false) {
            addProps.inputValue = '';
            if(typeof items !== 'undefined') {
                addProps.searchResults = items;
            }
        }
        this.setStateOrReduxAction({
            selectedItem: val, 
            showDropDown: false,
            showPlaceholder: val === false ? true : false,
            ...addProps
        });
        this.selectedItemChanged(val);
    }

    handleItemClick(e) {
        this.selectItem(e.target.innerText);
    }

    handleSelectedClick(e) {
        const { freeTextSelection } = this.props, 
            { inputValue, selectedItem } = this.getFromStateOrReduxProps();

        this.inputFieldSelectedAfterReopen = true;
        this.setStateOrReduxAction({
            showDropDown: true
        });
    }

    handleBlur() {
        this.closeDropDown();
    }

    buildRequestData() {
        const { url, showAttr } = this.props;
        return {
            url: url,
            showAttr: showAttr
        };
    }

    handleChange(e) {
        const { items, showAttr } = this.props, 
            { searchResults } = this.getFromStateOrReduxProps(),
            innerText = e.target.value;
        
        if(typeof items !== 'undefined') {
            this.setStateOrReduxAction({inputValue: innerText, searchResults: items.filter(item => item[showAttr].includes(innerText))});
        } else {
            this.setStateOrReduxAction({inputValue: innerText});
        }
    }

    checkDisplay(valueToCheck) {
        return {
            display: valueToCheck ? 'block' : 'none'
        };
    }

    checkHeight(height) {
        return {
            maxHeight: height + 'px'
        };
    }

    checkWidth(width) {
        return {
            width: width + 'px'
        };
    }

    render() {
        const { placeholder, showAttr, boxHeight, boxWidth, freeTextSelection } = this.props,
            { showPlaceholder, inputValue, searchResults, showDropDown, 
                fetching, selectedItem, error, resetSelected, focusIndex 
            } = this.getFromStateOrReduxProps(),
            resultAvailable = searchResults && searchResults.length > 0,
            hasSelected = selectedItem && selectedItem.length > 0,
            placeholderExist = typeof placeholder !== 'undefined' && placeholder.length > 0,
            showInputField = showDropDown || !hasSelected,
            showDropDownIcon = (resultAvailable || hasSelected) && !fetching && !showDropDown,
            showDropUpIcon = showDropDown && !fetching && inputValue.length > 0,
            showLeftIcon = showDropDown && inputValue.length === 0,
            errorsAvailable = error !== false;

        return (
            <div ref="mainBox" className="react-select-suggest" 
                    style={this.checkWidth(boxWidth)} 
                    onKeyDown={this.handleKeyDown}
                    onMouseLeave={this.handleMouseLeave}>
                <div className="react-select-suggest-input-main">
                    <div className="react-select-placeholder" 
                        style={this.checkDisplay(showPlaceholder && placeholderExist)}>{placeholder}
                    </div>
                    <div className="react-select-ajax-loader" 
                        style={this.checkDisplay(fetching)}>
                        <img src={ajaxLoader} />    
                    </div>
                    <div className="react-select-selected"
                        style={this.checkDisplay(!showInputField)}
                        onClick={this.handleSelectedClick}> 
                        {selectedItem}
                    </div>
                    <input onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        style={
                            Object.assign(
                                this.checkDisplay(showInputField),
                                this.checkWidth(boxWidth)
                            )
                        }
                        ref="inputField" value={inputValue}/>
                        <span className="react-select-clear" 
                            onClick={this.handleClear}
                            style={this.checkDisplay(hasSelected)}>x</span>
                        <span className="react-select-bottom-arrow" 
                            onClick={this.handleClickArrow}
                            style={this.checkDisplay(showDropDownIcon)}/>
                        <span className="react-select-up-arrow" 
                            onClick={this.handleClickArrow}
                            style={this.checkDisplay(showDropUpIcon)}/>
                        <span className="react-select-left-arrow" 
                            onClick={this.handleClickArrow}
                            style={this.checkDisplay(showLeftIcon)}/>
                </div>
                <div className="react-select-drop-down"
                    ref="dropDown"
                    style={
                        Object.assign(
                            this.checkDisplay(resultAvailable && showDropDown),
                            this.checkHeight(boxHeight)
                        )
                    }>
                    {resultAvailable && showDropDown &&
                        <ul>
                            {searchResults.map((result, index) =>
                                <ReactSelectSuggestItem 
                                    onHandleItemClick={this.handleItemClick}
                                    onHandleItemFocus={this.handleMouseOverItem}
                                    onHandleMouseMove={this.handleMouseMove}
                                    index={index} 
                                    key={index} 
                                    result={result}
                                    showAttr={showAttr}
                                    focusIndex={focusIndex}/>  
                            )}
                        </ul>
                    }
                </div>
                <div className="react-select-box-errors" style={this.checkDisplay(errorsAvailable)}>
                    {errorsAvailable &&
                        <ul>
                            <li>{error}</li>
                        </ul>
                    }
                </div>
                <div className="react-select-box" />
            </div>
        );
    }
}

ReactSelectSuggest.propTypes = {
    showAttr: PropTypes.string.isRequired,
    url: PropTypes.string,
    namespace: PropTypes.string,
    boxWidth: PropTypes.string,
    boxHeight: PropTypes.string,
    freeTextSelection: PropTypes.bool,
    placeholder: PropTypes.string,
    reduxComponent: PropTypes.bool,
    reactSelectReducer: PropTypes.object,
    actions: PropTypes.object,
    onSelectedChanged: PropTypes.func,
    items: PropTypes.array
};


const mapStateToProps = (state, ownProps) => {
    const namespace = ownProps.namespace || 'reactSelectReducer';
    return {
        reactSelectReducer: state[namespace],
        reduxComponent: true,
        namespace: namespace
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactSelectSuggest);