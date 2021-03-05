import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

//telus imports
import Paragraph from '@tds/core-paragraph';
import Button from '@tds/core-button';
import Heading from '@tds/core-heading';

//material-ui imports
import {
    CircularProgress,
    Select,
    MenuItem,
    InputLabel,
    TextField
} from '@material-ui/core';

const Home = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [requestData, setRequestData] = useState({});

    useEffect(() => {
        setRequestData(props.requestData);
        setLoading(false);
    }, []) 

    return (
        <>
            {loading ? <CircularProgress /> : <HomeBase requestData={requestData} error={error}/>}
        </>
    )
}

const HomeBase = (props) => {
    const [currentInputRequest, setCurrentInputRequest] = useState('');
    const [currentOutputRequest, setCurrentOutputRequest] = useState('');

    const formik = useFormik({
        initialValues: {
            inputRequest: '',
            inputStudy: '',
            outputRequest: '',
            outputStudy: '',
            startTime: '',
            endTime: '',
            timeBucket: '',
            minDwellTime: '',
            maxDwellTime: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            console.log(values);
        }
    });

    const mapRequestIds = () => {
        const result = props.requestData.shapefiles.map((item, key) => {
            return (
                <MenuItem value={item.requestId} key={key}>{item.requestId}</MenuItem>
            )
        });

        return result;
    }

    const mapStudyZones = (value) => {
        const temp = [];
        for(let i = 0; i < props.requestData.shapefiles.length; i++) {
            if(props.requestData.shapefiles[i].requestId === value) {
                temp.push(...props.requestData.shapefiles[i].input_geoid);
            }
        }

        if(temp) {
            const result = temp.map((item, key) => {
                return (
                    <MenuItem value={item} key={key}>{item}</MenuItem>
                )
            });
            return result;
        }
    }

    useEffect(() => {
        console.log(props.requestData);
        mapStudyZones('a3a456ec-ecd7-444c-8530-1b3c321c3f2e');
        setCurrentInputRequest('');
        setCurrentOutputRequest('');
    }, []);

    return (
        <div>
            <div><Paragraph>{props.error}</Paragraph></div>
            <div style={{paddingBottom: 20}}><Heading level="h2"> Data Parameters </Heading></div>
            <form className="dynamic-data-tool-form" onSubmit={formik.onSubmit}>
                <div className="sub-headers"><Heading level="h3">Input Geo ID</Heading></div>
                <InputLabel>Request ID</InputLabel>
                <Select className="select-field" id="inputRequest" name="inputRequest" onChange={(input) => setCurrentInputRequest(input.target.value)} defaultValue={formik.values.inputRequest}>
                    <MenuItem value=""></MenuItem>
                    {mapRequestIds()}
                </Select>

                <InputLabel>Study Zone</InputLabel>
                <Select className="select-field" id="inputStudy" name="inputStudy" onChange={formik.handleChange} defaultValue={formik.values.inputStudy}>
                    <MenuItem value=""></MenuItem>
                    {mapStudyZones(currentInputRequest)}
                </Select>

                <div className="sub-headers"><Heading level="h3">Output Geo ID</Heading></div>
                <InputLabel>Request ID</InputLabel>
                <Select className="select-field"  defaultValue="" onChange={(input) => setCurrentOutputRequest(input.target.value)}>
                    <MenuItem value=""></MenuItem>
                    {mapRequestIds()}
                </Select>

                <InputLabel>Study Zone</InputLabel>
                <Select className="select-field" defaultValue="" onChange={formik.handleChange} id="outputStudy" name="outputStudy" >
                    <MenuItem value=""></MenuItem>
                    {mapStudyZones(currentOutputRequest)}
                </Select>
                
                <TextField label="Start Time" variant="outlined" placeholder="yyyy-mm-ddT00:00:00" id="startTime" name="startTime" onChange={formik.handleChange} value={formik.values.inputStudy} />
                
                <TextField label="End Time" variant="outlined" placeholder="yyyy-mm-ddT00:00:00" id="endTime" name="endTime" onChange={formik.handleChange} value={formik.values.endTime} />
                <br/>
                <TextField label="Time Bucket Size" variant="outlined" id="timeBucket" name="timeBucket" onChange={formik.handleChange} value={formik.values.timeBucket} />
                <br />
                <TextField label="Minimum Dwell Time" variant="outlined" id="minDwellTime" name="minDwellTime" onChange={formik.handleChange} value={formik.values.minDwellTime} />
                <TextField label="Max Dwell Time" variant="outlined" id="maxDwellTime" name="maxDwellTime" onChange={formik.handleChange} value={formik.values.maxDwellTime} />

                <Button variant="standard" name="route-submit" type="submit">Submit Data</Button>
            </form>
        </div>
    )
}

export default Home;