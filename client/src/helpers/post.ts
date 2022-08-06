interface IHeightHandlerArguments {
   (
      cloneHeight: number,
      heightField: number,
      setHeightField: (arg: number) => void,
      setFieldOverflow: (arg: "hidden" | "auto") => void,
      maxHeight: number,
      minHeight: number,
   ): void
}

// правильно реагируем на изменяющуюся высоту div-клона, чтобы изменять высоту textarea
export const heightHandler: IHeightHandlerArguments = (cloneHeight, heightField, setHeightField, setFieldOverflow, maxHeight, minHeight) => {
   if (cloneHeight >= maxHeight) {
      setFieldOverflow("auto");
   } else if (cloneHeight === minHeight) {
      setHeightField(minHeight);
      setFieldOverflow("hidden");
   } else if (cloneHeight > heightField) {
      setHeightField(cloneHeight);
      setFieldOverflow("hidden");
   } else if (cloneHeight < heightField) {
      setHeightField(cloneHeight);
      setFieldOverflow("hidden");
   }
};
