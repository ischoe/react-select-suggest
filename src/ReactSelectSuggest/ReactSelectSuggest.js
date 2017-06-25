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
            { inputField, mainBox, dropDown } = this.refs,
            { offsetWidth: inputOffset } = inputField,
            { offsetWidth: mainOffset } = mainBox,
            boxWidthValue = parseInt(boxWidth);

        if (boxWidth) {
            if(inputOffset > boxWidthValue) {
                const offset = inputOffset - boxWidthValue,
                    inputOffsetInPx = (boxWidthValue - offset) + 'px',
                    dropDownOffsetInPx = (boxWidthValue - offset/2) + 'px';

                inputField.style.width = inputOffsetInPx;
                dropDown.style.width = dropDownOffsetInPx;
            }
        } else {
            const inputOffsetInPx = mainOffset + 'px';

            inputField.style.width = inputOffsetInPx;
            dropDown.style.width = inputOffsetInPx;

            const offset = inputField.offsetWidth - parseInt(inputField.style.width);
            if(offset > 0) {
                inputField.style.width = (parseInt(inputField.style.width) - offset) + 'px';
                dropDown.style.width = mainOffset - (offset/2)  + 'px';
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { reactSelectReducer, reduxComponent } = this.props,
            { inputValue } = reduxComponent ? reactSelectReducer : this.state;

        if(reduxComponent) {
            if(prevProps.reactSelectReducer.inputValue !== inputValue) {
                if(inputValue && inputValue.length > 0) {
                    this.props.actions.searchForResults(this.props.namespace, inputValue, this.buildRequestData());
                } else {
                    this.props.actions.clearSearchResults(this.props.namespace);
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
                    error: error.message
                });
            });
    }

    enableFocus() {
        if(this.props.reduxComponent) {
            this.props.actions.hidePlaceholder(this.props.namespace);
            this.props.actions.showDropDown(this.props.namespace);
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
        if(this.props.reduxComponent) {
            this.props.actions.selectItem(this.props.namespace, e.target.innerText);
            this.props.actions.hideDropDown(this.props.namespace);
        } else {
            this.setState({
                selectedItem: e.target.innerText,
                showDropDown: false
            });
        }
    }

    handleSelectedClick() {
        if(this.props.reduxComponent) {
            this.props.actions.selectItem(this.props.namespace, false);
            this.props.actions.showDropDown(this.props.namespace);
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
                this.props.actions.showPlaceholder(this.props.namespace);
            } else {
                this.setState({
                    showPlaceholder: true
                });
            }
        }

        if(reduxComponent) {
            this.props.actions.hideDropDown(this.props.namespace);
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

        if(this.props.reduxComponent) {
            this.props.actions.changeInputValue(this.props.namespace, innerText);
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
    namespace: PropTypes.string,
    boxWidth: PropTypes.string,
    boxHeight: PropTypes.string,
    placeholder: PropTypes.string,
    reduxComponent: PropTypes.bool,
    reactSelectReducer: PropTypes.object,
    actions: PropTypes.object
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