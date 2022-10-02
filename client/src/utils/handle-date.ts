/** делаем дату согласно нужному нам формату */
export const handleDate = (): string => {
   const month = new Date().toDateString().substr(4, 3);
   const day = new Date().getDate();
   const year = new Date().getFullYear();
   const hour = new Date().getHours();
   const minute = new Date().getMinutes();

   return `${month} ${day} ${year} at ${hour}:${minute < 10 ? '0' + minute : minute}`;
};
