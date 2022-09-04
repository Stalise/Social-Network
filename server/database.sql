
create TABLE persons(
   username VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255),
   surname VARCHAR(255),
   birth VARCHAR(255),
   city VARCHAR(255),
   avatar VARCHAR(255),
   password VARCHAR(255),
   token VARCHAR(500),
);

create TABLE posts(
   id SERIAL PRIMARY KEY,
   text VARCHAR(2000),
   date VARCHAR(255),
   img VARCHAR(255),
   likes INTEGER DEFAULT 0,
   user_username VARCHAR(255),
   FOREIGN KEY (user_username) REFERENCES persons (username) ON DELETE CASCADE
);

create TABLE likes(
   id SERIAL PRIMARY KEY,
   user_username VARCHAR(255),
   post_id INTEGER,
   FOREIGN KEY (user_username) REFERENCES persons (username) ON DELETE CASCADE,
   FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

create TABLE photos(
   id SERIAL PRIMARY KEY,
   img VARCHAR(255),
   user_username VARCHAR(255),
   FOREIGN KEY (user_username) REFERENCES persons (username) ON DELETE CASCADE
);

create TABLE friends(
   id SERIAL PRIMARY KEY,
   user_first VARCHAR(255),
   user_second VARCHAR(255),
   status VARCHAR(255),
   FOREIGN KEY (user_first) REFERENCES persons (username) ON DELETE CASCADE,
   FOREIGN KEY (user_second) REFERENCES persons (username) ON DELETE CASCADE
);

create TABLE chats(
   id SERIAL PRIMARY KEY,
   user_first VARCHAR(255),
   user_second VARCHAR(255),
   FOREIGN KEY (user_first) REFERENCES persons (username) ON DELETE CASCADE,
   FOREIGN KEY (user_second) REFERENCES persons (username) ON DELETE CASCADE
);

create TABLE messages(
   id SERIAL PRIMARY KEY,
   text VARCHAR(2000),
   date VARCHAR(255),
   user_username VARCHAR(255),
   chat_id INTEGER,
   FOREIGN KEY (user_username) REFERENCES persons (username) ON DELETE CASCADE,
   FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
);
