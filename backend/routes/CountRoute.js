const router = require('express').Router();
const { default:axios } = require('axios');
const cors = require('cors');
 
const customerend = 'https://partner-customer-service-dot-cio-insights-api-dv-a28ee1.nn.r.appspot.com/job/:customerId?key=sadsda';

router.get('/geofence', cors(), async (req, res) => {
    console.log('hit geofence');
    
    await axios.get('https://request-handler-dot-cio-insights-api-dv-a28ee1.nn.r.appspot.com/geofence?key=AIzaSyAkXek_Rea-BxIGc5jduMPfs1EakkTkac4', {
        headers: { 
            'customerId': process.env.CUSTOMER_ID
        }
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
    }
);

router.post('/home', async (req, res) => {
    console.log('hit home');
    const body = req.body;
    console.log(body);

    await axios.post('https://request-handler-dot-cio-insights-api-dv-a28ee1.nn.r.appspot.com/count/home?key=AIzaSyAkXek_Rea-BxIGc5jduMPfs1EakkTkac4', {
        input_geoid: {
            requestId: body.input_geoid.requestId,
            study_zone: body.input_geoid.study_zone
        },
        output_geoid: {
            requestId: body.output_geoid.requestId,
            study_zone: body.output_geoid.study_zone
        },
        start_time: body.start_time,
        end_time: body.end_time,
        time_bucket_size: body.time_bucket_size,
        exclusion_types: [],
        min_dwell_time: body.min_dwell_time,
        max_dwell_time: body.max_dwell_time,
    }, 
    {
        headers: { customerId: '8919e317-55a1-4560-875f-ecb972294370' },
    })
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

router.post('/work', cors(), async (req, res) => {
    console.log('hit work');
    await axios.post('https://request-handler-dot-cio-insights-api-dv-a28ee1.nn.r.appspot.com/count/work?key=AIzaSyAkXek_Rea-BxIGc5jduMPfs1EakkTkac4', {
    })
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

router.post('/job', cors(), async (req, res) => {
    console.log('hit work');
    await axios.post('https://partner-customer-service-dot-cio-insights-api-dv-a28ee1.nn.r.appspot.com/job/:customerId?key=AIzaSyAkXek_Rea-BxIGc5jduMPfs1EakkTkac4', {
    })
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

module.exports = router;