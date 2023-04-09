interface FetchDataProps {
  url: string;
  httpMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

export const sendAPICall = async ({
  url,
  httpMethod = 'POST',
  data = {},
}: FetchDataProps): Promise<any> => {
  const requestOptions: RequestInit = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'xupOnEtvaP3fghp9nenYh2P4Bd6AusGS2z18Ellb',
    },
  };

  if (httpMethod === 'POST' || httpMethod === 'PUT') {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    throw error;
  }
};
