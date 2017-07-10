import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const ReactSelectSuggestItem = (props) => {

    const handleItemClick = (e) => {
        props.onHandleItemClick(e);
    };

    const handleItemFocus = () => {
        props.onHandleItemFocus(props.index);
    };

    const handleMouseMove = () => {
        props.onHandleMouseMove(props.index);
    };

    const getItemClass = (index) => {
        const { focusIndex } = props,
            focusClass = focusIndex === index ? ' react-select-suggest-focus' : '';

        return index % 2 > 0 ? 'odd' + focusClass : 'even' + focusClass;
    };

    return (
        <li onMouseDown={handleItemClick}
            onMouseOver={handleItemFocus}
            onMouseMove={handleMouseMove}
            key={props.index}
            className={getItemClass(props.index)}>{props.result[props.showAttr]}</li>
    );
};

ReactSelectSuggestItem.propTypes = {
    onHandleItemClick: PropTypes.func.isRequired,
    onHandleItemFocus: PropTypes.func.isRequired,
    onHandleMouseMove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    result: PropTypes.object.isRequired,
    showAttr: PropTypes.string.isRequired
};

export default ReactSelectSuggestItem;