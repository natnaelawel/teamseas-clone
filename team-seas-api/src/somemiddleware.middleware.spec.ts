import { SomemiddlewareMiddleware } from './somemiddleware.middleware';

describe('SomemiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new SomemiddlewareMiddleware()).toBeDefined();
  });
});
