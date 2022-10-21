import axios from 'axios';

const apiPost = async (endpoint: string, params: Record<string, unknown>) => {
  const result = await axios.post(`/api${endpoint}`, params, {
    headers: {
      'content-type': 'application/json',
    },
    maxBodyLength: Infinity,
  });
  return result.data;
};

export default apiPost;
