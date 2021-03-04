import React, { Component } from 'react';
import Form from '../Form/Form';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './DataTool.css';
import axios from 'axios';

const INITIAL_STATE = {
    loading: false,
    formType: "",
    formData: {},
}
export default class DataTool extends Component {
 
    constructor() {
        super();
        this.state = {...INITIAL_STATE}
    }

    getRequestIDList = async () => {
        await axios.get('http://localhost:9000/api/count/geofence')
        .then((res) => {
            const {shapefiles} = res.data.customer_shapes[0]
            return shapefiles;
        }).catch(({ request }) => {
            console.log( request );
        })
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