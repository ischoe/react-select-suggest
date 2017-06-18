import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReactSelectSuggest, ReactSelectSuggestActions } from './export';

const Demo = ({reactSelectSuggest, actions}) => (
  <div>
    <ReactSelectSuggest 
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/todos"
        showAttr="title"
        boxHeight= "200"
        boxWidth="500"
        reactSelectSuggest={reactSelectSuggest} 
        actions={actions}/>
  </div>
);

const mapStateToProps = state => ({
    reactSelectSuggest: state.ReactSelectSuggestReducer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
});

Demo.propTypes = {
    actions: PropTypes.object.isRequired,
    reactSelectSuggest: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);