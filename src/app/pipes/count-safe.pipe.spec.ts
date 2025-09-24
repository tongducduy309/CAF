import { CountSafePipe } from './count-safe.pipe';

describe('CountSafePipe', () => {
  it('create an instance', () => {
    const pipe = new CountSafePipe();
    expect(pipe).toBeTruthy();
  });
});
