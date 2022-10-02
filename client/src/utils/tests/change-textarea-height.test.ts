import { changeTextareaHeight } from '..';

describe('getImagesUrls', () => {
   const setHeightField = jest.fn();
   const setFieldOverflow = jest.fn();

   const argumentsList = [ setHeightField, setFieldOverflow, 220, 45] as const;

   it('should correctly called functions for 120 height', () => {
      changeTextareaHeight(120, ...argumentsList);

      expect(setHeightField).toHaveBeenCalledTimes(1);
      expect(setFieldOverflow).toHaveBeenCalledTimes(1);
   });

   it('should correctly called functions for 45 height', () => {
      changeTextareaHeight(45, ...argumentsList);

      expect(setHeightField).toHaveBeenCalledTimes(1);
      expect(setFieldOverflow).toHaveBeenCalledTimes(1);
   });

   it('should correctly called functions for 240 height', () => {
      changeTextareaHeight(240, ...argumentsList);

      expect(setHeightField).not.toHaveBeenCalled();
      expect(setFieldOverflow).toHaveBeenCalledTimes(1);
   });
});
