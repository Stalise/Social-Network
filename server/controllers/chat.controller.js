const db = require('../utils/db');
const events = require('events');

const emitter = new events.EventEmitter();

class ChatController {

   async chatJoin(req, res) {

      const { user_id, interlocutor_id } = req.query

      try {
         const checkChat = await db.query('SELECT * FROM chat WHERE user_first = $1 AND user_second=$2', [user_id, interlocutor_id])
         const checkChatTwo = await db.query('SELECT * FROM chat WHERE user_first = $1 AND user_second=$2', [interlocutor_id, user_id])

         // проверяем создан ли чат с данными юзерами в бд, если нет, то создаем
         if (!checkChat.rows.length && !checkChatTwo.rows.length) {
            const createChat = await db.query('INSERT INTO chat (user_first, user_second) values($1, $2) RETURNING *', [user_id, interlocutor_id])

            res.json(createChat.rows[0].id)

         } else if (checkChat.rows.length) {

            res.json(checkChat.rows[0].id)

         } else if (checkChatTwo.rows.length) {

            res.json(checkChatTwo.rows[0].id)
         }
      } catch (error) {
         console.log(error)
      }
   }

   async chatAll(req, res) {
      const user_id = req.params.id

      try {

         const allChats = await db.query('SELECT * FROM chat WHERE user_first = $1 OR user_second = $1', [user_id])
         const chatsInfo = [...allChats.rows]

         // в полученный массив с чатами, мы добавляем доп. информацию из других таблиц в бд
         for (let i of chatsInfo) {

            let interlocutorId = 0;

            // определяем чему равен id собеседника для данного чата. Данные взяты из бд 
            i.user_first === Number(user_id) ? interlocutorId = i.user_second : interlocutorId = i.user_first

            // имя и фотография собеседника
            const interlocutor = await db.query('SELECT img, name FROM person WHERE id = $1', [interlocutorId])
            i.interlocutor_img = interlocutor.rows[0].img
            i.interlocutor_name = interlocutor.rows[0].name

            // есть есть сообщения в чате, то берем последнее для отображения на странице чатов
            const lastMessage = await db.query(
               'SELECT text, date, user_id FROM message WHERE chat_id = $1 ORDER BY id DESC LIMIT 1',
               [i.id])

            // если последнее сообщение от собеседника, то добавляем его данные в ответ
            if (lastMessage.rows.length && lastMessage.rows[0].user_id !== Number(user_id)) {
               i.text = lastMessage.rows[0].text
               i.date = lastMessage.rows[0].date
               i.user_id = lastMessage.rows[0].user_id
            }
         }

         res.json(chatsInfo)

      } catch (error) {
         console.log(error)
      }
   }

   async delChat(req, res) {
      const { user_id, chat_id } = req.body
      console.log(chat_id)
      await db.query('DELETE FROM chat WHERE id = $1', [chat_id])

      const allChats = await db.query('SELECT * FROM chat WHERE user_first = $1 OR user_second = $1', [user_id])

      const chatsInfo = [...allChats.rows]

      // в полученный массив с чатами, мы добавляем доп. информацию из других таблиц в бд
      for (let i of chatsInfo) {

         let interlocutorId = 0;

         // определяем чему равен id собеседника для данного чата. Данные взяты из бд 
         i.user_first === Number(user_id) ? interlocutorId = i.user_second : interlocutorId = i.user_first

         // имя и фотография собеседника
         const interlocutor = await db.query('SELECT img, name FROM person WHERE id = $1', [interlocutorId])
         i.interlocutor_img = interlocutor.rows[0].img
         i.interlocutor_name = interlocutor.rows[0].name

         // есть есть сообщения в чате, то берем последнее для отображения на странице чатов
         const lastMessage = await db.query(
            'SELECT text, date, user_id FROM message WHERE chat_id = $1 ORDER BY id DESC LIMIT 1',
            [i.id])

         // если последнее сообщение от собеседника, то добавляем его данные в ответ
         if (lastMessage.rows.length && lastMessage.rows[0].user_id !== Number(user_id)) {
            i.text = lastMessage.rows[0].text
            i.date = lastMessage.rows[0].date
            i.user_id = lastMessage.rows[0].user_id
         }
      }

      res.json(chatsInfo)
   }

   async getMessages(req, res) {
      const { chat_id, user_id } = req.query


      try {
         const chat = await db.query('SELECT * FROM chat WHERE id = $1', [chat_id])
         const chatData = chat.rows[0]

         let interlocutorId = 0;
         // определяем чему равен id собеседника для данного чата. Данные взяты из бд 
         chatData.user_first === Number(user_id) ? interlocutorId = chatData.user_second : interlocutorId = chatData.user_first

         const interlocutorData = {
            name: '',
            surname: '',
            img: ''
         }

         // имя, фамилия и фотография собеседника из бд, и помещение их в объект
         const interlocutor = await db.query('SELECT name, surname, img FROM person WHERE id = $1', [interlocutorId])
         interlocutorData.name = interlocutor.rows[0].name
         interlocutorData.surname = interlocutor.rows[0].surname
         interlocutorData.img = interlocutor.rows[0].img

         const allMessages = await db.query('SELECT * FROM message WHERE chat_id = $1', [chat_id])

         res.json([interlocutorData, allMessages.rows])
      } catch (error) {
         console.log(error)
      }
   }

   async getMessageOne(req, res) {
      const chatId = req.params.id

      // обработчик который сработает при попадании сообщения на сервер
      const listener = (message) => {
         if (message.chat_id === Number(chatId)) {
            clearTimeout(timeout)
            res.json(message)
         }
      }

      // объявление обработчика
      emitter.once('newMessage', listener)

      // таймаут для перезапуска long-pollinga
      const timeout = setTimeout(() => {
         emitter.removeListener('newMessage', listener)
         res.sendStatus(500)
      }, 60000)

   }

   async createMessages(req, res) {
      const { text, chat_id, user_id, date } = req.body

      try {
         const newMessage = await db.query(
            `INSERT INTO message (text, date, user_id, chat_id) 
            values ($1, $2, $3, $4) RETURNING *`,
            [text, date, user_id, chat_id])

         // отправляет сообщение с клиента в getMessageOne  
         emitter.emit('newMessage', newMessage.rows[0])
         res.status(200).send('New message')
      } catch (error) {
         console.log(error)
      }
   }

}

module.exports = new ChatController