import { IMessage, IMessageDateSections } from 'types/common';

export const getHeight = (element: HTMLDivElement | null) => element?.scrollHeight ?? 0;

export const sortMessagesWithDate = (arr: IMessage[]) => {
   const obj: IMessageDateSections = {};
   const filteredArr = arr.filter(item => new Date(item.date).toString() !== 'Invalid Date');
   const sortedArr = filteredArr.sort((a, b) => a.date < b.date ? -1 : 1);

   sortedArr.forEach(item => {
      const section = new Date(item.date).toLocaleDateString('en', { month: 'long', day: '2-digit' });

      obj[section] = obj.hasOwnProperty(section) ? obj[section].concat(item) : [item];
   });

   return obj;
};
