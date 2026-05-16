import client from './client';

export const listDatabases = () => client.get('/databases');
export const createDatabase = (data) => client.post('/databases', data);
export const getDatabase = (id) => client.get(`/databases/${id}`);
export const deleteDatabase = (id) => client.delete(`/databases/${id}`);
export const pollStatus = (id) => client.get(`/databases/${id}/status`);
