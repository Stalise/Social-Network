
export const transformFile = async (file: File): Promise<string> => {

   return new Promise(resolve => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
         if (typeof (reader.result) === "string") {
            resolve(reader.result);
         }
      };
   });
};