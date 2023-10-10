const post = (endpoint: string, body: object) => fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

async function save(text: string): Promise<{ error?: string }> {
  const body = { text };
  const res = await post('/api/save', body);
  const { error } = await res.json();
  return { error };
}

export const test = {
  post,
};

export default {
  save,
};
