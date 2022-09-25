import { dateHandler } from 'helpers/common';

describe('dateHandler', () => {
   beforeAll(() => {
      jest.useFakeTimers();
   });

   it('should return correct result for 1664119924682 timestamp', () => {
      jest.setSystemTime(1664119924682);

      expect(dateHandler()).toBe('Sep 25 2022 at 18:32');
   });

   it('should return correct result for 1452111824682 timestamp', () => {
      jest.setSystemTime(1452111824682);

      expect(dateHandler()).toBe('Jan 6 2016 at 23:23');
   });

   afterAll(() => {
      jest.useRealTimers();
   });
});
