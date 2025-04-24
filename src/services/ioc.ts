import 'reflect-metadata';
import { Container } from 'inversify';
import { ApiService } from './api';
import { TYPES } from '../types/index';

// Create a new IoC container
const container = new Container();

// Bind the ApiService to the container
container.bind<ApiService>(TYPES.ApiService).to(ApiService);

export { container };