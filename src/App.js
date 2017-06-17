import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReactSelectSuggest, ReactSelectSuggestActions } from './export';

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
    reactSelectSuggest: state.ReactSelectSuggestReducer
})

const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
