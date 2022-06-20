
export const getDate = (): string => {
   const dateMonth = new Date().toDateString().substr(4, 3);
   const dateDay = new Date().getDate();
   const dateYear = new Date().getFullYear();
   const dateHour = new Date().getHours();
   const dateMinute = new Date().getMinutes();

   const resultDate: string = `${dateMonth} ${dateDay} ${dateYear} as ${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute}`;
   return resultDate;
};

// const subscribeUpdateChat = async () => {
//    try {
      
//    } catch (error) {
      
//    }
// };