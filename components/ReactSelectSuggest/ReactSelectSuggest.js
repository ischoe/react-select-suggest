import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './ReactSelectSuggest.css';
import ajaxLoader from './ajax-loader.gif';

class ReactSelectSuggest extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { boxWidth } = this.props,
            { inputField, mainBox } = this.refs,
            { offsetWidth : inputOffset } = inputField,
            { offsetWidth : mainOffset } = mainBox,
            boxWidthValue = parseInt(boxWidth);
        
        if(boxWidth) {
            if(inputOffset > boxWidthValue) {
                const offset = inputOffset - boxWidthValue,
                    inputOffsetInPx = (boxWidthValue - offset) + 'px';

                inputField.style.width = inputOffsetInPx;
            }
        } else {
            const { clientWidth, offsetWidth } = inputField,
                    offset = offsetWidth - clientWidth,
                    inputOffsetInPx = (mainOffset - offset) + 'px';

            inputField.style.width = inputOffsetInPx;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { reactSelectSuggest } = this.props,
            { inputValue } = reactSelectSuggest;
            
        if(prevProps.reactSelectSuggest.inputValue !== inputValue) {
            if(inputValue && inputValue.length > 0) {
                this.props.actions.searchForResults(inputValue, this.buildRequestData());
            } else {
                this.props.actions.clearSearchResults();
            }
        }
    }

    enableFocus() {
        this.props.actions.hidePlaceholder();
        this.props.actions.showDropDown();
    }

    handleFocus(e) {
        this.enableFocus();
    }

    handleClick(e) {
        this.enableFocus();
    }

    handleItemClick(e) {
        this.props.actions.selectItem(e.target.innerText);
        this.props.actions.hideDropDown();
    }

    handleSelectedClick() {
        this.props.actions.selectItem(false);
        this.props.actions.showDropDown();
    }

    handleBlur(e) {
        const { reactSelectSuggest } = this.props,
            { inputValue, selectedItem } = reactSelectSuggest;
        
        if(!inputValue || inputValue.length === 0) {
            this.props.actions.showPlaceholder();
        }
        this.props.actions.hideDropDown();
    }

    buildRequestData() {
        const { url, showAttr } = this.props;
        return {
            url: url,
            showAttr: showAttr
        }
    }

    handleChange(e) {
        const innerText = e.target.value;
        this.props.actions.changeInputValue(innerText);
    }

    checkDisplay(valueToCheck) {
        return {
            display: valueToCheck ? 'block' : 'none'
        }
    }

    checkHeight(height) {
        return {
            maxHeight: height + 'px'
        }
    }

    checkWidth(width) {
        return {
            width: width + 'px'
        }
    }

    render() {
        const { reactSelectSuggest, placeholder, showAttr, boxHeight, boxWidth } = this.props,
            { showPlaceholder, inputValue, searchResults, showDropDown, fetching, selectedItem } = reactSelectSuggest,
            resultAvailable = searchResults && searchResults.length > 0,
            hasSelected = selectedItem && selectedItem.length > 0;

        return (
            <div ref="mainBox" className="react-select-suggest" style={this.checkWidth(boxWidth)}>
                <div className="react-select-suggest-input-main">
                    <div className="react-select-placeholder" style={this.checkDisplay(showPlaceholder)}>{placeholder}</div>
                    <div className="react-select-ajax-loader" 
                        style={this.checkDisplay(fetching)}>
                        <img src={ajaxLoader} />    
                    </div>
                    <div className="react-select-selected"
                        style={this.checkDisplay(hasSelected)}
                        onClick={this.handleSelectedClick.bind(this)}> 
                        {selectedItem}
                    </div>
                    <input onFocus={this.handleFocus.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        onClick={this.handleClick.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        style={
                            Object.assign(
                                this.checkDisplay(!hasSelected),
                                this.checkWidth(boxWidth)
                            )
                        }
                        ref="inputField"/>
                </div>
                <div className="react-select-drop-down" 
                    style={
                        Object.assign(
                            this.checkDisplay(resultAvailable && showDropDown),
                            this.checkHeight(boxHeight),
                        )
                    }>
                    {resultAvailable && showDropDown &&
                        <ul>
                            {searchResults.map((result, index) =>
                                <li onMouseDown={this.handleItemClick.bind(this)} 
                                    key={index} 
                                    className={index % 2 > 0 ? 'odd' : 'even'}>{result[showAttr]}</li>
                            )}
                        </ul>
                    }
                </div>
                <div className="react-select-box"></div>
            </div>
        );
    }
}

ReactSelectSuggest.propTypes = {
    actions: PropTypes.object.isRequired,
    reactSelectSuggest: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    showAttr: PropTypes.string.isRequired
}

export default ReactSelectSuggest;