import { RetryWithBackoff } from './retry-with-backoff';

describe('RetryWithBackoff', () => {
  it('should create an instance', () => {
    expect(new RetryWithBackoff()).toBeTruthy();
  });
});
