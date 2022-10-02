import { imagesMock } from './mock/images';
import { getImagesUrls } from '..';

describe('getImagesUrls', () => {
   it('should return correct result for imagesMock', async () => {
      expect(getImagesUrls(imagesMock)).toHaveLength(3);
   });

   it('should return empty array', () => {
      expect(getImagesUrls([])).toEqual([]);
   });
});
