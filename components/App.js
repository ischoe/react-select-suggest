import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReactSelectSuggestActions from './ReactSelectSuggest/ReactSelectSuggestActions';
import ReactSelectSuggest from './ReactSelectSuggest/ReactSelectSuggest';

const App = ({reactSelectSuggest, actions}) => (
  <div>
    <ReactSelectSuggest 
        placeholder="Search..."
        url="https://jsonplaceholder.typicode.com/posts"
        showAttr="title"
        boxHeight= "200"
        boxWidth="500"
        reactSelectSuggest={reactSelectSuggest} 
        actions={actions}/>
  </div>
)

const mapStateToProps = state => ({
    reactSelectSuggest: state.reactSelectSuggest
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
