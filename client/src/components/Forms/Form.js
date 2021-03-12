import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    InputLabel,
    CircularProgress,
    Select,
    MenuItem,
} from '@material-ui/core';

//utility imports
import { useFormik } from 'formik';
import axios from 'axios';

//telus imports
import Heading from '@tds/core-heading';

//form imports
import Home from './Home';
import DwellTime from './DwellTime';
import Work from './Work';
import TotalTrip from './TotalTrip';
import Unique from './Unique';
import Origin from './Origin';
import Destination from './Destination';

const FormBase = (props) => {
    const [requestData, setRequestData] = useState('loading...');
    const [customerId, setCustomerId] = useState('fetching customer id...');
    const [route, setRoute] = useState({target: {value: "Home"}});
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

    const renderForm = (value) => {
        switch(value) {
            case "dwelltime": 
                return <DwellTime requestData={requestData} />
            case "work":
                return <Work requestData={requestData} />
            case "totaltrip":
                return <TotalTrip requestData={requestData} />
            case "unique":
                return <Unique requestData={requestData} />
            case "origin":
                return <Origin requestData={requestData} />
            case "destination":
                return <Destination requestData={requestData} />
            default:
                return <Home requestData={requestData} />
        }
    }

    return (
        <div>
            <div>    
                <div style={{paddingBottom: 20}}><Heading level="h2">Request Parameters</Heading></div>
                <form className="data-selection-form">
                    <InputLabel>Request Type</InputLabel>
                    <Select className="select-field" name="route" onChange={(route) => {setRoute(route); console.log(route.target.value)}} defaultValue="home">
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
                { loading ? <CircularProgress /> : renderForm(route.target.value) }
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