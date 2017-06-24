import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './ReactSelectSuggest.css';
import ajaxLoader from './ajax-loader.gif';
import * as ReactSelectSuggestActions from './ReactSelectSuggestActions';

export class ReactSelectSuggest extends Component {
    constructor (props) {
        super(props);

        if(!this.props.reduxComponent) {
            this.state = {
                showPlaceholder: true,
                inputValue: '',
                fetching: false,
                showDropDown: false,
                searchResults: [],
                error: false,
                selectedItem: ''
            };
        }

        this.handleSelectedClick = this.handleSelectedClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount () {
        const { boxWidth } = this.props,
            { inputField, mainBox } = this.refs,
            { offsetWidth: inputOffset } = inputField,
            { offsetWidth: mainOffset } = mainBox,
            boxWidthValue = parseInt(boxWidth);

        if (boxWidth) {
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
        const { reactSelectReducer, reduxComponent } = this.props,
            { inputValue } = reduxComponent ? reactSelectReducer : this.state;

        if(reduxComponent) {
            if(prevProps.reactSelectReducer.inputValue !== inputValue) {
                if(inputValue && inputValue.length > 0) {
                    this.props.actions.searchForResults(inputValue, this.buildRequestData());
                } else {
                    this.props.actions.clearSearchResults();
                }
            }
        } else {
            if(prevState.inputValue !== inputValue) {
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
                    error: error
                });
            });
    }

    enableFocus() {
        if(this.props.reduxComponent) {
            this.props.actions.hidePlaceholder();
            this.props.actions.showDropDown();
        } else {
            this.setState({
                showPlaceholder: false,
                showDropDown: true
            });
        }
    }

    handleFocus(e) {
        this.enableFocus();
    }

    handleClick(e) {
        this.enableFocus();
    }

    handleItemClick(e) {
        if(this.state.reduxComponent) {
            this.props.actions.selectItem(e.target.innerText);
            this.props.actions.hideDropDown();
        } else {
            this.setState({
                selectedItem: e.target.innerText,
                showDropDown: false
            });
        }
    }

    handleSelectedClick() {
        if(this.state.reduxComponent) {
            this.props.actions.selectItem(false);
            this.props.actions.showDropDown();
        } else {
            this.setState({
                selectedItem: false,
                showDropDown: true
            });
        }
    }

    handleBlur(e) {
        const { reactSelectReducer, reduxComponent } = this.props,
            { inputValue, selectedItem } = reduxComponent ? reactSelectReducer : this.state;
        
        if(!inputValue || inputValue.length === 0) {
            if(reduxComponent) {
                this.props.actions.showPlaceholder();
            } else {
                this.setState({
                    showPlaceholder: true
                });
            }
        }

        if(reduxComponent) {
            this.props.actions.hideDropDown();
        } else {
            this.setState({
                showDropDown: false
            });
        }
    }

    buildRequestData() {
        const { url, showAttr } = this.props;
        return {
            url: url,
            showAttr: showAttr
        };
    }

    handleChange(e) {
        const innerText = e.target.value;

        if(this.state.reduxComponent) {
            this.props.actions.changeInputValue(innerText);
        } else {
            this.setState({
                inputValue: innerText
            });
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
        const { reactSelectReducer, placeholder, showAttr, boxHeight, boxWidth, reduxComponent } = this.props,
            { showPlaceholder, inputValue, searchResults, showDropDown, fetching, selectedItem, error } = reduxComponent ? reactSelectReducer : this.state,
            resultAvailable = searchResults && searchResults.length > 0,
            hasSelected = selectedItem && selectedItem.length > 0,
            errorsAvailable = error !== false;

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
                        onClick={this.handleSelectedClick}> 
                        {selectedItem}
                    </div>
                    <input onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onClick={this.handleClick}
                        onChange={this.handleChange}
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
                            this.checkHeight(boxHeight)
                        )
                    }>
                    {resultAvailable && showDropDown &&
                        <ul>
                            {searchResults.map((result, index) =>
                                <li onMouseDown={this.handleItemClick} 
                                    key={index}
                                    className={index % 2 > 0 ? 'odd' : 'even'}>{result[showAttr]}</li>
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
    url: PropTypes.string.isRequired,
    showAttr: PropTypes.string.isRequired,
    boxWidth: PropTypes.string,
    boxHeight: PropTypes.string,
    placeholder: PropTypes.string,
    reduxComponent: PropTypes.bool,
    reactSelectReducer: PropTypes.object,
    actions: PropTypes.object
};


const mapStateToProps = state => ({
    reactSelectReducer: state.reactSelectReducer,
    reduxComponent: true
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactSelectSuggest);