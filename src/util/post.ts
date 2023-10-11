/**
 *
 * @param {string} endpoint The endpoint to POST to
 * @param {object} body The JSON.stringifyable data to POST
 * @returns The result of the POST request to the endpoint
 */
const post = (endpoint: string, body: object) => fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export default post;
