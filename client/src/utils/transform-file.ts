/** помогает из обычного файла картинки сделать base64 */
export const transformFile = async (file: File): Promise<string> => (
   new Promise(resolve => {
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
         if (typeof (reader.result) === 'string') {
            resolve(reader.result);
         }
      };
   })
);
