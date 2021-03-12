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
    TextField
} from '@material-ui/core';

const TotalTrip = (props) => {
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState({});

    useEffect(() => {
        setRequestData(props.requestData);
        setLoading(false);
    }, []) 

    return (
        <div>
            {loading ? <CircularProgress /> : <TotalTripBase requestData={requestData}/>}
        </div>
    )
}

const TotalTripBase = (props) => {
    const [currentInputRequest, setCurrentInputRequest] = useState();
    
    const formik = useFormik({
        initialValues: {
            inputRequest: '',
            inputStudy: '',
            startTime: '',
            endTime: '',
            timeBucketSize: '',
            minDwellTime: '',
            maxDwellTime: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            console.log("yo" + values);
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
    }, []);

    return (
        <div>
            <div><Paragraph>{props.error}</Paragraph></div>
            <div style={{paddingBottom: 20}}><Heading level="h2"> Data Parameters </Heading></div>
            <form>
                <Select onChange={(input) => setCurrentInputRequest(input.target.value)}>
                    {mapRequestIds()}
                </Select>
                <Select>
                    {mapStudyZones(currentInputRequest)}
                </Select>
                <br />
                <TextField label="Start Time" variant="outlined" placeholder="yyyy-mm-ddT00:00:00" id="startTime" name="startTime" onChange={formik.handleChange} value={formik.values.inputStudy} />
                <TextField label="End Time" variant="outlined" placeholder="yyyy-mm-ddT00:00:00" id="endTime" name="endTime" onChange={formik.handleChange} value={formik.values.endTime} />
                <br/>
                <TextField label="Time Bucket Size" variant="outlined" id="timeBucket" name="timeBucket" onChange={formik.handleChange} value={formik.values.timeBucket} />
                <br />
                <TextField label="Minimum Dwell Time" variant="outlined" id="minDwellTime" name="minDwellTime" onChange={formik.handleChange} value={formik.values.minDwellTime} />
                <br />
                <TextField label="Max Dwell Time" variant="outlined" id="maxDwellTime" name="maxDwellTime" onChange={formik.handleChange} value={formik.values.maxDwellTime} />

                <Button variant="standard" name="route-submit" type="submit">Submit Data</Button>
            </form>
        </div>
    );
}

export default TotalTrip;