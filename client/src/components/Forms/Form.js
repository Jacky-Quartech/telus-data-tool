import React, { useEffect, useState, useLayoutEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFormik } from 'formik';
import Heading from '@tds/core-heading';
import Paragraph from '@tds/core-paragraph';
import Home from './Home';
import { 
    Select,
    MenuItem
 } from '@material-ui/core';

import axios from 'axios';

const FormBase = (props) => {
    const [requestData, setRequestData] = useState('loading...');
    const [customerId, setCustomerId] = useState('fetching customer id...');
    const [route, setRoute] = useState('');
    const [loading, setLoading] = useState(true);

    const getRequestIDList = async () => {
        await axios.get('http://localhost:9000/api/count/geofence')
        .then((res) => {
            const results = res.data.customer_shapes[0];
            setRequestData(results);
            return res;         
        })
        .then((res) => {
            setCustomerId(res.customerId);
            if(requestData) {
                setLoading(false);
            }
        })
        .catch(({ request }) => {
            console.log( request );
        });
    }

    useLayoutEffect(() => {
        getRequestIDList();
    }, [customerId]);

    return (
        <div>
            <div>    
                <div style={{paddingBottom: 20}}><Heading level="h2">Request Parameters</Heading></div>
                <form className="data-selection-form">
                    <InputLabel>Request Type</InputLabel>
                    <Select className="select-field" name="route" onChange={(route) => {setRoute(route)}} value={route}>
                        <MenuItem aria-label="" value=''>None Selected</MenuItem>
                        <MenuItem value="dwelltime">dwell time</MenuItem>
                        <MenuItem value="home">home</MenuItem>
                        <MenuItem value="totaltrip">total trip</MenuItem>
                        <MenuItem value="unique">unique</MenuItem>
                        <MenuItem value="origin">origin</MenuItem>
                        <MenuItem value="destination">destination</MenuItem>
                        <MenuItem value="odmatrix">od matrix</MenuItem>
                        <MenuItem value="tradearea">trade area</MenuItem>
                        <MenuItem value="work">work</MenuItem>
                        <MenuItem value="demographic">demographic</MenuItem>
                        <MenuItem value="repeatvisitation">repeat visitation</MenuItem>
                        <MenuItem value="advanceddwelltime">advanced dwell time</MenuItem>
                        <MenuItem value="passthrough">passthrough</MenuItem>
                        <MenuItem value="avgtraveltime">average travel time</MenuItem>
                        <MenuItem value="avgtravelspeed">average travel speed</MenuItem>
                        <MenuItem value="inboundtraveldirection">inbound travel direction</MenuItem>
                        <MenuItem value="outboundtraveldirection">outbound travel direction</MenuItem>
                    </Select>
                </form>
                { loading ? <CircularProgress /> : <Home requestData={requestData} /> }
            </div>
        </div>
    );
}

const Form = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="endpoint-form">
            {
                loading ? <CircularProgress color="secondary" /> : 
                <div>
                    <FormBase />
                </div>
            }
        </div>
    )
}

export default Form;