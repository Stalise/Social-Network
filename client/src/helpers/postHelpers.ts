
interface IHeightHandlerArguments {
   (
      cloneHeight: number,
      heightField: number,
      setHeightField: (arg: number) => void,
      setFieldOverflow: (arg: "hidden" | "auto") => void,
   ): void
}

export const heightHandler: IHeightHandlerArguments = (cloneHeight, heightField, setHeightField, setFieldOverflow) => {
   if (cloneHeight >= 220) {
      setFieldOverflow("auto");
   } else if (cloneHeight === 70) {
      setHeightField(70);
      setFieldOverflow("hidden");
   } else if (cloneHeight > heightField) {
      setHeightField(cloneHeight);
      setFieldOverflow("hidden");
   } else if (cloneHeight < heightField) {
      setHeightField(cloneHeight);
      setFieldOverflow("hidden");
   }
};

export const dateHandler = (): string => {
   const month = new Date().toDateString().substr(4, 3);
   const day = new Date().getDate();
   const year = new Date().getFullYear();
   const hour = new Date().getHours();
   const minute = new Date().getMinutes();

   const resultDate = `${month} ${day} ${year} at ${hour}:${minute < 10 ? '0' + minute : minute}`;

   return resultDate;
};