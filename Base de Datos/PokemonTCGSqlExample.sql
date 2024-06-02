CREATE DATABASE IF NOT EXISTS PokemonTCG;

CREATE TABLE Player (
    Player_id INT PRIMARY KEY,
    Active_Deck INT,
    Player_Level INT,
    Player_Name VARCHAR(255),
    Description TEXT,
    Matchups INT,
    Total_Wins INT,
    Date_Created DATE,
    FOREIGN KEY (Active_Deck) REFERENCES Deck(Deck_id)
);
CREATE TABLE Deck (
    Deck_id INT PRIMARY KEY,
    Name VARCHAR(255),
    Date_Created DATE,
    Total_cards INT,
    Winrate FLOAT
);
CREATE TABLE Deck_Card (
    Deck_Card_id INT PRIMARY KEY,
    Card_id INT,
    Deck_id INT,
    FOREIGN KEY (Card_id) REFERENCES Card(Card_id),
    FOREIGN KEY (Deck_id) REFERENCES Deck(Deck_id)
);
CREATE TABLE Card (
    Card_id INT PRIMARY KEY,
    Name VARCHAR(255),
    Type VARCHAR(255),
    Description TEXT,
    Attacks INT,
    HP INT,
    Effect INT,
    Stage INT,
    Retreat_Cost INT,
    FOREIGN KEY (Effect) REFERENCES Effect(Effect_id)
);
CREATE TABLE Effect (
    Effect_id INT PRIMARY KEY,
    Description TEXT,
    Duration INT,
    Buffs TEXT,
    Debuffs TEXT,
    Target TEXT
);
CREATE TABLE Attack (
    Attack_id INT PRIMARY KEY,
    Name VARCHAR(255),
    Description TEXT,
    Cost INT,
    Type VARCHAR(255),
    Damage INT
);

CREATE TABLE Matchup (
    Matchup_id INT PRIMARY KEY,
    Player1_id INT,
    Player2_id INT,
    Winner INT,
    FOREIGN KEY (Player1_id) REFERENCES Player(Player_id),
    FOREIGN KEY (Player2_id) REFERENCES Player(Player_id),
    FOREIGN KEY (Winner) REFERENCES Player(Player_id)
);

INSERT INTO Player (Player_id, Active_Deck, Player_Level, Player_Name, Description, Matchups, Total_Wins, Date_Created)
VALUES (1, 2, 9, 'InsanePlayer420', 'hehehhe', 69, 65, '2023-01-01'),
	   (2, 2, 9, 'InsanePlayer419', 'hehehhex2', 69, 3, '2023-01-01'),
       (3, 1, 9, 'NormalPlayer69', 'Poser who loves charizard', 10, 5, '2023-02-01');

INSERT INTO Card (Card_id, Name, Type, Description, Attacks, HP, Effect, Stage, Retreat_Cost)
VALUES (1, 'Charizard', 'Fire', 'Strong fire Pokemon', 2, 150, 1, 2, 3),
       (2, 'Blastoise', 'Water', 'Strong water Pokemon', 2, 160, 2, 2, 4);

INSERT INTO Deck (Deck_id, Name, Date_Created, Total_cards, Winrate)
VALUES (1, 'Charizard Spam', '2023-01-01', 60, 1),
       (2, 'Troll Deck', '2023-01-01', 59, 0.90);

INSERT INTO Deck_Card (Deck_Card_id, Card_id, Deck_id)
VALUES (1, 1, 1),
       (2, 2, 2);
       
INSERT INTO Effect (Effect_id, Description, Duration, Buffs, Debuffs, Target)
VALUES (1, 'Burns opponent', 3, 'Damage +10', 'HP -5', 'Opponent'),
       (2, 'Freezes opponent', 2, 'Damage +15', 'Speed -10', 'Opponent');
       
INSERT INTO Attack (Attack_id, Name, Description, Cost, Type, Damage)
VALUES (1, 'Flame Thrower', 'Throws a flame', 3, 'Fire', 90),
       (2, 'Water Gun', 'Shoots water', 2, 'Water', 80);

INSERT INTO Matchup (Matchup_id, Player1_id, Player2_id, Winner)
VALUES (1, 1, 2, 1),
	   (2, 3, 1, 1);

-- Muesta el player y su deck actual
CREATE VIEW PlayerDeckView AS
SELECT 
    Player.Player_id, 
    Player.Player_Name, 
    Deck.Deck_id, 
    Deck.Name AS Deck_Name
FROM 
    Player
JOIN 
    Deck ON Player.Active_Deck = Deck.Deck_id;


-- Muesta todas las cartas y la desc de su efecto
CREATE VIEW CardEffectView AS
SELECT 
    Card.Card_id, 
    Card.Name AS Card_Name, 
    Effect.Description AS Effect_Description
FROM 
    Card
JOIN 
    Effect ON Card.Effect = Effect.Effect_id;

-- Esta view muestra Jugadores 1 y 2, y el resultado de la match
-- que por cierto la nombre 'Matchup' porque match es palabra reservada jaja
CREATE VIEW GameWinnerView AS
SELECT 
    Matchup.Matchup_id, 
    Player1.Player_Name AS Player1_Name, 
    Player2.Player_Name AS Player2_Name, 
    WinnerPlayer.Player_Name AS Winner_Name
FROM 
    Matchup
JOIN 
    Player AS Player1 ON Matchup.Player1_id = Player1.Player_id
JOIN 
    Player AS Player2 ON Matchup.Player2_id = Player2.Player_id
JOIN 
    Player AS WinnerPlayer ON Matchup.Winner = WinnerPlayer.Player_id;
    
-- queries basicas + views
SELECT * FROM PlayerDeckView;
SELECT * FROM CardEffectView;
SELECT * FROM GameWinnerView;
