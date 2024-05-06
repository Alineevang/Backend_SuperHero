CREATE DATABASE personagens;

CREATE TABLE personagens(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    poder VARCHAR(100) NOT NULL,
    nivel INT NOT NULL,
    hp INT NOT NULL
);

CREATE TABLE batalhas(
    id SERIAL PRIMARY KEY,
    id_persoanegm1 INT,
    id_personagem2 INT,
    id_vencedor INT,
    FOREIGN KEY (id_persoanegm1) REFERENCES personagens(id),
    FOREIGN KEY (id_personagem2) REFERENCES personagens(id),
    FOREIGN KEY (id_vencedor) REFERENCES personagens(id)
);


INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Naruto Uzumaki', 'Clones Das Sombra', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Sasuke Uchiha', 'Sharingan', 9, 92);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Sakura Haruno', 'Ninjutsu Médico', 7, 74);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Kakashi Hatake', 'Jutsus de Relâmpago', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Rock Lee', 'Taijutsu', 9, 92);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Neji Hyuga', 'Byakugan', 9, 95);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Tenten', 'Técnica de Invocação', 8, 86);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Hinata Hyuga', 'Jutsus de Palma', 8, 78);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Shikamaru Nara', 'Ninjutsu Estratégico', 9, 92);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Ino Yamanaka', 'Técnica de Controle Mental', 7, 76);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Gaara', 'Manipulação de Areia', 9, 96);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Kiba Inuzuka', 'Ninjutsu de Cão', 8, 87);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Shino Aburame', 'Ninjutsu de Insetos', 7, 74);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Choji Akimichi', 'Ninjutsu de Ampliação', 8, 81);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Temari', 'Ninjutsu de Vento', 8, 85);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Kankuro', 'Ninjutsu de Marionetes', 8, 82);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Jiraiya', 'Sábio dos Sapos', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Orochimaru', 'Técnicas de Serpente', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Tsunade', 'Ninjutsu Médico', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Killer Bee', 'Jinchuriki do Oito-Caudas', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Itachi Uchiha', 'Reino Das Chamas Infernais', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Madara Uchiha', 'Rinnegan', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Hashirama Senju', 'Senjutsu', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Minato Namikaze', 'Hiraishin no Jutsu', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Kabuto Yakushi', 'Invocação de Cobras', 7, 77);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Sarutobi Hiruzen', 'Ninjutsu Elemental', 9, 90);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Asuma Sarutobi', 'Técnicas de Fumaça', 8, 80);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Shisui Uchiha', 'Genjutsu Poderoso e Técnica dos Corvos', 9, 94);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Konan', 'Técnicas de Papel', 7, 74);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Deidara', 'Arte da Explosão', 8, 87);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Pain', 'Rinnegan', 10, 100);
INSERT INTO personagens (name, poder, nivel, hp) VALUES ('Konohamaru Sarutobi', 'Rasengan', 7, 75);







