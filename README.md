# Blockchain Decentralized ID (DID) Authentication Demo

[![Build Status](https://travis-ci.org/viseo-asia/blockchain-civic-demo.svg?branch=master)](https://travis-ci.org/viseo-asia/blockchain-civic-demo)

[![Coverage Status](https://coveralls.io/repos/github/viseo-asia/blockchain-civic-demo/badge.svg?branch=master)](https://coveralls.io/github/viseo-asia/blockchain-civic-demo?branch=master)

## Overview

Web application blockchain-based decentralized ID (DID) authentication with [civic.com](civic.com)

![Civic Architecutre](app/assets/images/civic-architecture.png)

## Prerequisites

Install the Civic app on your mobile device.

## Developer setup

1. Git clone the repo
2. `cd blockchain-civic-demo`
3. `npm install`
4. `npm start`
5. Open [http://127.0.0.1:3000](http://127.0.0.1:3000) (use IP address not localhost)

## Test

## Unit tests

- `npm test`
- `npm run test-coverage`
- `npm run test-coverage-html` (html reports in coverage/ dir)

## Integration tests - End-to-End (e2e)

Currently tests only localhost, needs a running local instance on port 3000.

- `npm run e2e`

## Performance/Stress testing with Gatling.

- Install JAVA JRE: `apt-get install default-jre`
- Download from [https://gatling.io/download/](https://gatling.io/download/)
- Unzip and set GATLING_HOME env var to point to the unzipped folder:
- Example: `export GATLING_HOME=~/Downloads/gatling-charts-highcharts-bundle-2.3.0/`
- Execute performance/stress tests and generate HTML reports:
- `cd blockchain-civic-demo`
- `$GATLING_HOME/bin/gatling.sh -sf test/perf -rf test/perf-results`
- Output screenshots:

![Console](doc/images/gatling-console-output.png)

![HTML](doc/images/gatling-html-output.png)



