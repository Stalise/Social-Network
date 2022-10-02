import { transformFile } from '..';

describe('transformFile', () => {
   it('should return base64 string after transform file', async () => {
      const file = new File([''], 'image.jpg');

      expect(typeof (await transformFile(file))).toBe('string');
   });
});
