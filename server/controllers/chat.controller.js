const db = require('../utils/db');
const events = require("events");

const responseMessages = require('../constants/responseMessages');

const emitter = new events.EventEmitter();

class ChatController {

   async getChats(req, res) {
      const { username } = req.params;
      const result = []

      try {
         const chats = await db.query(`
            SELECT * 
            FROM chats 
            WHERE user_first = $1 
            OR user_second = $1
            `, [username]);

         for (let elem of chats.rows) {
            const interlocutor = elem.user_first === username ? elem.user_second : elem.user_first

            let person = await db.query(`
               SELECT * 
               FROM persons 
               WHERE username = $1
               `, [interlocutor]);
            person = person.rows[0];

            const messages = await db.query(`
               SELECT messages.id, messages.text, messages.date, persons.avatar, persons.name, persons.surname 
               FROM messages 
               JOIN persons ON messages.user_username = persons.username
               WHERE chat_id = $1
               ORDER BY id LIMIT 100`,
               [elem.id]);

            const chatData = {
               id: elem.id,
               username: person.username,
               forename: person.name,
               surname: person.surname,
               avatar: person.avatar,
               messages: messages.rows,
            }

            result.push(chatData);
         }

         res.status(200).json({ message: responseMessages.success, chats: result })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async createChat(req, res) {
      const { user_username, person_username } = req.body

      let person = await db.query(`
         SELECT * 
         FROM persons 
         WHERE username = $1
         `, [person_username]);
      person = person.rows[0];

      try {
         // проверка наличия чата в бд
         const checkAvailable = await db.query(`
            SELECT * 
            FROM chats 
            WHERE (user_first = $1 AND user_second = $2) 
            OR (user_first = $2 AND user_second = $1)
            `, [user_username, person_username]);

         if (checkAvailable.rows.length) {
            const messages = await db.query(`
               SELECT * 
               FROM messages 
               WHERE chat_id = $1 
               ORDER BY id DESC 
               LIMIT 100
               `, [checkAvailable.rows[0].id]);

            const chatData = {
               id: elem.id,
               username: person.username,
               forename: person.name,
               surname: person.surname,
               avatar: person.avatar,
               messages: messages.rows,
            }

            res.status(200).json({ message: responseMessages.success, chat: chatData })
         } else {
            let chat = await db.query(`
               INSERT INTO chats (user_first, user_second) 
               VALUES ($1, $2) 
               RETURNING *
               `, [user_username, person_username]);
            chat = chat.rows[0]

            const chatData = {
               id: chat.id,
               username: person.username,
               forename: person.name,
               surname: person.surname,
               avatar: person.avatar,
               messages: [],
            }

            res.status(200).json({ message: responseMessages.success, chat: chatData })
         }
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async deleteChat(req, res) {
      const { id } = req.params;

      try {
         await db.query(`
            DELETE FROM chats 
            WHERE id = $1
            `, [id]);

         res.status(200).json({ message: responseMessages.success })
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected })
      }
   }

   async createMessage(req, res) {
      const { text, date, user_username, chat_id } = req.body

      try {
         // создаем новое сообщение в бд
         const response = await db.query(`
            INSERT INTO messages (text, date, user_username, chat_id)
            VALUES ($1, $2, $3, $4) 
            RETURNING *
            `, [text, date, user_username, chat_id]);

         //джойним данные таблиц чтобы сделать ответ для клиента, вернуть сообщение в нужном формате
         const message = await db.query(`
            SELECT messages.chat_id, messages.id, messages.text, messages.date, persons.avatar, persons.name, persons.surname 
            FROM messages 
            JOIN persons ON messages.user_username = persons.username
            WHERE id = $1`,
            [response.rows[0].id]);

         // отправляем новое сообщение в слушатель
         emitter.emit("action", message.rows[0]);
         res.status(200).json({ message: responseMessages.success });
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }

   async getMessage(req, res) {
      const chat_id = req.params.id

      try {
         const listener = message => {
            if (message.chat_id === Number(chat_id)) {
               clearTimeout(timeout);
               res.status(200).json({ message: responseMessages.success, data: message });
            };
         }

         emitter.once("action", listener);

         const timeout = setTimeout(() => {
            emitter.removeListener("action", listener);
            res.status(307).json({ message: responseMessages.requestExpired });
         }, 30000);
      } catch (error) {
         res.status(500).json({ message: responseMessages.unexpected });
      }
   }
}

module.exports = new ChatController;