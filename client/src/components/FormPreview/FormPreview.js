import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import Paragraph from '@tds/core-paragraph';

import JSONPretty from 'react-json-pretty';
import FormContext from '../FormContext';

const FormPreviewBase = (props) => {
    const [formType, setFormType] = useState('');
    
    useEffect(() => {
        if (formType !== Object) {
            setFormType({
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
            });
        }
    }, [])

    return (
        <div>
            {formType === Object ? <Paragraph>Form has failed to load properly please refresh the page or clear your cache</Paragraph> : <JSONPretty data={formType}></JSONPretty>}
        </div>
        
    )
}

const FormPreview = () => {
    const [loading, setLoading] = useState(true);
    const form = useContext(FormContext);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="results">
            {loading ? <CircularProgress /> : <FormPreviewBase form={form} />}
        </div>

        
    )
}

export default FormPreview;