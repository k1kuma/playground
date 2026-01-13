/*
Craft Demo: Intelligent Capacity Management (ICM) Service

Business Context
We need to optimize power usage in high-density data centers. We are building a service to monitor power spikes and prediction capacity limits for AI workloads. 

Your task is to implement the core backend API and database layer for the Intelligent Capacity Management (ICM) service. 

1. PostgreSQL Schema (DDL) 
Write the SQL to create the necessary tables. You must include at least: 
        * racks: Configuration (e.g., rack_id, name, max_power_kw). 
        * power_readings: Time-series data (timestamp, power_kw). 

RACKS TABLE
rack_id      | SERIAL PRIMARY KEY
name         | VARCHAR(255) NOT NULL
max_power_kw | INTEGER NOT NULL

POWER_READINGS TABLE
reading_id | SERIAL PRIMARY KEY*
rack_id    | INTEGER REFERENCES racks(rack_id)
timestamp  | TIMESTAMP NOT NULL
power_kw   | INTEGER NOT NULL

2. API Endpoints 
Implement the following RESTful endpoints: 

POST
/v1/{rackId}/readings/{timestamp}/{power_kw}
@desc: Ingests and persists a new power reading.
@params.body: {
  "rack_id": string;
  "timestamp": string;
  "power_kw": number;
}
@output_code: 201 Created on success, 400 Bad Request on failure, 40X for deadlock/array exeption, 503 (unavailable/db issue), 504 (timeout)

GET
/v1/racks/{rackId}/report
@desc: Retrieves the Advanced Data Report (see below).
@params: rackId
@output: JSON {
  "top_spikes": {
    "reading_id": string;
    "rack_id": string;
    "timestamp": string;
    "power_kw": number;
  }[5],
  "average_power_kw": number <average power_kw over last 7 days>
}
@output_code: 200 Created on success, 400 Bad Request on failure, 40X for deadlock/array exeption, 503 (unavailable/db issue), 504 (timeout)

dbQuery:
  output.top_spikes: SELECT * FROM power_readings WHERE rack_id = $1 AND timestamp >= NOW() - INTERVAL '30 days' ORDER BY power_kw DESC LIMIT 5;
  output.average_power_kw: SELECT AVG(power_kw) FROM power_readings WHERE rack_id = $1 AND timestamp >= NOW() - INTERVAL '7 days';

3. The Advanced SQL Requirement 
The GET endpoint must execute a single, optimized PostgreSQL query (or an efficient set of queries) that calculates the following aggregation for a specific rack_id: 

Top Spikes: The 5 highest recorded power_kw readings over the past 30 days. 
- not necessarily power_kw > max_power_kw, just highest readings
Recent Trend: The average power_kw consumption across the last 7 days. 

Result: The API must return these two distinct metrics in a single JSON response.

*/

/*
GET
/v1/racks/{rackId}/report
@desc: Retrieves the Advanced Data Report (see below).
@params: rackId
@output: JSON {
  "top_spikes": {
    "reading_id": string;
    "rack_id": string;
    "timestamp": string;
    "power_kw": number;
  }[5],
  "average_power_kw": number <average power_kw over last 7 days>
}
@output_code: 200 Created on success, 400 Bad Request on failure, 40X for deadlock/array exeption, 503 (unavailable/db issue), 504 (timeout)
*/

const express = require('express');
const http = express(); // or express.Router()

// GATEWAY
/**
 * No description
 *
 * @name GetRackReport
 * @request GET:/v1/racks/{rackId}/report
 */
http.get('/v1/racks/:rackId/report', async (req, res) => {
  const rackId = req.params.rackId;
  const report = await getRackReport(rackId);
  res.status(report.status).send(report.body);
});

async function getRackReport(rackId) {
  if (!rackId) return { status: 400, body: 'Bad Request: rackId is required' };
  const top_spikes_query = `SELECT * FROM power_readings WHERE rack_id = $1 AND timestamp >= NOW() - INTERVAL '30 days' ORDER BY power_kw DESC LIMIT 5;`;
  const average_power_query = `SELECT AVG(power_kw) AS average_power_kw FROM power_readings WHERE rack_id = $1 AND timestamp >= NOW() - INTERVAL '7 days';`;

  try {
    const top_spikes_result = await db.query(top_spikes_query, [rackId]);
    const average_power_result = await db.query(average_power_query, [rackId]);

    const top_spikes = top_spikes_result.rows;
    const average_power_kw = average_power_result.rows[0].average_power_kw;
    
    return {
      status: 200,
      body: {
        top_spikes,
        average_power_kw,
      },
    };
  } catch (error) {
    console.error('Database error:', error);
    if (error.code === '40X') {
      return { status: 408, body: 'deadlock/array exeption' };
    } else if (error.code === '504') {
      return { status: 504, body: 'Database timeout' };
    }

    return { status: 503, body: 'Service Unavailable: Database error' };
  }
}