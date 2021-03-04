import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@tds/core-button';
import Paragraph from '@tds/core-paragraph';
import { useFormik } from 'formik';
import Heading from '@tds/core-heading';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const FormBase = (props) => {
    const [formType, setFormType] = useState('');
    const [endpoint, setEndPoint] = useState('');
    const [requestIds, setRequestIds] = useState('');
    const [requestData, setRequestData] = useState('');
    const [customerId, setCustomerId] = useState('fetching customer id...');
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            route: 'None',
            requestId: '',
            inputgeoid: '',
            studyzoneinputgeo: '',
        },
        onSubmit: async () => {
        },
    });

    const mapRequestIds = () => {
        const temp = [];
        for(let i = 0; i < requestData.length; i++) {
            temp.push(requestData[i].requestId);
            console.log(temp);
        }

        const result = requestData.shapefiles.map((item, id) => {
            return <option value={item.requestId} key={id}>{item.requestId}</option>
        });

        console.log(result);

        return result;
    }

    const getRequestIDList = async () => {
        await axios.get('http://localhost:9000/api/count/geofence')
        .then((res) => {
            return res;
        })
        .then((res) => {
            setRequestData(res.data.customer_shapes[0]);
            return requestData;
        })
        .then((res) => {
            console.log(res);
            setCustomerId(res.customerId);
            setRequestIds(mapRequestIds());
        })
        .catch(({ request }) => {
            console.log( request );
        });
    }

    useEffect(() => {
        getRequestIDList();
    }, [customerId]);

    return (
        <div>
            <div>
                <div style={{paddingBottom: 20}}><Heading level="h2">Request Parameters</Heading></div>
                <form className="data-selection-form">
                    <InputLabel>Request Type</InputLabel>
                    <Paragraph>Customer ID: {customerId}</Paragraph>
                    <Select className="select-field" defaultValue="None" name="route" onChange={formik.handleChange}>
                        <option aria-label="None" value="None">None Selected</option>
                        <option value="dwelltime">dwell time</option>
                        <option value="home">home</option>
                        <option value="totaltrip">total trip</option>
                        <option value="unique">unique</option>
                        <option value="origin">origin</option>
                        <option value="destination">destination</option>
                        <option value="odmatrix">od matrix</option>
                        <option value="tradearea">trade area</option>
                        <option value="work">work</option>
                        <option value="demographic">demographic</option>
                        <option value="repeatvisitation">repeat visitation</option>
                        <option value="advanceddwelltime">advanced dwell time</option>
                        <option value="passthrough">passthrough</option>
                        <option value="avgtraveltime">average travel time</option>
                        <option value="avgtravelspeed">average travel speed</option>
                        <option value="inboundtraveldirection">inbound travel direction</option>
                        <option value="outboundtraveldirection">outbound travel direction</option>
                    </Select>
                </form>
                <form className="dynamic-data-tool-form">
                    <InputLabel>Request ID</InputLabel>
                    <Select className="select-field" defaultValue="my-id" name="requestId">
                        <option value="my-id">6fab7fb8-041a-4cb7-bfba-ec62cb9160dd (My ID)</option>
                        {requestIds}
                    </Select>
                </form>
            </div>
            <div>
                <div><Paragraph>Do not test this form :)</Paragraph></div>
                <div style={{paddingBottom: 20}}><Heading level="h2"> Data Parameters </Heading></div>
                <form className="dynamic-data-tool-form">
                    <div className="sub-headers"><InputLabel>Input Geo ID</InputLabel></div>
                    <InputLabel>Request ID</InputLabel>
                    <Select className="select-field" defaultValue="myId" name="inputgeoid">
                        <option value="myId">672123fb8-021a-4cb7-bfba-ec62cb91641d</option>
                        {requestIds}
                    </Select>

                    <InputLabel>Study Zone</InputLabel>
                    <Select className="select-field" defaultValue="" name="studyzoneinputgeo">
                        <option value="">Downtown</option>
                        <option value="inkster">Inkster</option>
                    </Select>

                    <div className="sub-headers"><InputLabel>Output Geo ID</InputLabel></div>
                    <InputLabel>Request ID</InputLabel>
                    <Select className="select-field"  defaultValue="">
                        <option value="">672123fb8-021a-4cb7-bfba-ec62cb91641d</option>
                        {requestIds}
                    </Select>

                    <InputLabel>Study Zone</InputLabel>
                    <Select className="select-field"  defaultValue="">
                        <option value="">Inkster</option>
                        <option value="inkster">Inkster</option>
                    </Select>
                    
                    <TextField id="outlined-basic" label="Start Time" variant="outlined" placeholder="yyy-mm-ddT00:00:00" />
                    
                    <TextField id="outlined-basic" label="End Time" variant="outlined" placeholder="yyy-mm-ddT00:00:00" />
                    <br/>
                    <TextField id="outlined-basic" label="Time Bucket Size" variant="outlined" />
                    <br />
                    <TextField id="outlined-basic" label="Minimum Dwell Time" variant="outlined" />
                    <TextField id="outlined-basic" label="Max Dwell Time" variant="outlined" />

                    <Button variant="standard" name="route-submit" onSubmit={formik.onSubmit}>Submit Data</Button>
                </form>
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
            {loading ? <CircularProgress color="secondary" /> : <FormBase />}
        </div>
    )
}

export default Form;