import client from './client';

export const signup = (data) => client.post('/auth/signup', data);
export const login = (data) => client.post('/auth/login', data);
export const logout = () => client.post('/auth/logout');
export const forgotPassword = (data) => client.post('/auth/forgot-password', data);
export const resetPassword = (data) => client.post('/auth/reset-password', data);
