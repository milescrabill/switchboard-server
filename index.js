// packages
import express from 'express';

// local imports
import config from './lib/config.js';
import Manager from './lib/manager.js';
import Experiment from './lib/experiment.js';

var app = express();

// main route
app.get('/', function(req, res) {
    // manager constructor takes query args and a # of buckets
    let manager = new Manager(req.query, config.get('num_buckets'));
    let results = {
        'onboarding-a': manager.turnOnBucket(0, 50),
        'onboarding-b': manager.turnOnBucket(50, 100)
    }

    // return experiment results
    // let experiment = new Experiment(manager);
    // let results = experiments.sample();

    res.send(JSON.stringify(results));
})

// update route
app.get('/' + config.get('update_server_url'), function(req, res) {
    res.send('update');
})

app.listen(8080);
