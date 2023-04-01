async function sendAPICall(url, httpMethod, data) {
  try {
    const response = await fetch(url, {
      method: httpMethod,
      headers: {'Content-Type': 'application/json', 'x-api-key': 'xupOnEtvaP3fghp9nenYh2P4Bd6AusGS2z18Ellb'},
      body: httpMethod === 'POST' || httpMethod === 'PUT' ? JSON.stringify(data) : null,
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      // Handle error responses, e.g., show an alert, throw an error, or return an error object
      console.error(`Error ${response.status}: ${response.statusText}`);
      return { error: true, status: response.status, message: response.statusText };
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: true, message: error.message };
  }
}
