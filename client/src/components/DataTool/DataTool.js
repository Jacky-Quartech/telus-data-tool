import React, { Component } from 'react';
import Form from '../Forms/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './DataTool.css';
import axios from 'axios';

const INITIAL_STATE = {
    loading: false,
}
export default class DataTool extends Component {
 
    constructor() {
        super();
        this.state = {...INITIAL_STATE}
    }

    render() {
        return (
            <div className="container">
                <Form className="endpoint-form"/>
                <ResultsContainer className="results"/>
            </div>
        )
    }
}