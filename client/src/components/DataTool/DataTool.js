import React, { Component } from 'react';
import Form from '../Forms/Form';
import FormPreview from '../FormPreview/FormPreview';
import './DataTool.css';
import { FormProvider } from '../FormContext';

const INITIAL_STATE = {
    loading: false,
    data: {
        input_geoid: {
            requestId: 'empty',
            study_zone: ['empty']
        },
        output_geoid: {
            requestId: 'empty',
            study_zone: ['empty']
        },
        start_time: 'empty',
        end_time: 'empty',
        time_bucket_size: 'empty',
        exclusion_types: [],
        min_dwell_time: 'empty',
        max_dwell_time: 'empty',
    },
}
export default class DataTool extends Component {
 
    constructor() {
        super();
        this.state = {...INITIAL_STATE}
    }

    render() {
        return (
            <FormProvider value={this.state.data}>
                <div className="container">
                    <Form />
                    <FormPreview />
                </div>
            </FormProvider>
        )
    }
}