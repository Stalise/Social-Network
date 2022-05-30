
create TABLE person(
   id SERIAL PRIMARY KEY,
   username VARCHAR(255),
   name VARCHAR(255),
   surname VARCHAR(255),
   birth VARCHAR(255),
   city VARCHAR(255),
   img VARCHAR(255),
   password VARCHAR(255)
);

create TABLE post(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   surname VARCHAR(255),
   img_user VARCHAR(255),
   text VARCHAR(2000),
   date VARCHAR(255),
   img_post VARCHAR(255),
   user_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES person (id)
);

create TABLE likes(
   id SERIAL PRIMARY KEY,
   user_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES person (id),
   post_id INTEGER,
   FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);

create TABLE person_photos(
   id SERIAL PRIMARY KEY,
   img VARCHAR,
   user_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES person (id)
);

create TABLE friends(
   id SERIAL PRIMARY KEY,
   user_id INTEGER,
   friend_id INTEGER,
   status VARCHAR(255),
   FOREIGN KEY (user_id) REFERENCES person (id),
   FOREIGN KEY (friend_id) REFERENCES person (id)
);

create TABLE chat(
   id SERIAL PRIMARY KEY,
   user_first INTEGER,
   user_second INTEGER,
   FOREIGN KEY (user_first) REFERENCES person (id),
   FOREIGN KEY (user_second) REFERENCES person (id)
);

create TABLE message(
   id SERIAL PRIMARY KEY,
   text VARCHAR(2000),
   date VARCHAR(255),
   user_id INTEGER,
   chat_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES person (id),
   FOREIGN KEY (chat_id) REFERENCES chat (id) ON DELETE CASCADE
);

