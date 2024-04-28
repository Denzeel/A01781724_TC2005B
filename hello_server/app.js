"use strict"
import express from 'express';

const app = express();
const port = 3002;
app.use(express.json());

let cards_list = [
    {
        "id": 0,
        "cardName": "Bite",
        "description": "Damage your opponent",
        "damage": 1,
        "accuracy": 80,
        "healing": 0,
        "target": "enemy",
        "art": "Assets/Sprites/Card_Bite"
    },
    {
        "id": 1,
        "cardName": "Growl",
        "description": "Growl at ur opponent",
        "damage": 20,
        "accuracy": 100,
        "healing": 0,
        "target": "enemy",
        "art": "Assets/Sprites/Card_Growl"
    },
    {
        "id": 2,
        "cardName": "Scratch",
        "description": "Scratch ur opponent",
        "damage": 30,
        "accuracy": 50,
        "healing": 0,
        "target": "enemy",
        "art": "Assets/Sprites/Card_Scratch"
    },
    {
        "id": 3,
        "cardName": "Search trash can",
        "description": "Search a trash can for a chance of heals",
        "damage": 0,
        "accuracy": 85,
        "healing": 20,
        "target": "player",
        "art": "Assets/Sprites/SearchTrashCan"
    }];

//Debe de regresar todas las cartas que estén almacenadas. 
//Si no hay cartas, envía un mensaje de que no hay cartas.
app.get('/cards', (req, res) => {
    if (cards_list.length > 0) {
        res.json(cards_list);
    } else {
        res.status(200).send('No available cards');
    }
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);   
})

//Debe de regresar solo una carta en base a un ID. 
//Verifica que la carta exista antes de enviar algo. 
//En caso de que la carta no exista, regresa un mensaje indicándolo.
app.get('/card/:id', (req, res) => {
    const cardId = req.params.id;
    const card = cards_list.find((card)=>card.id===parseInt(cardId));
    if (card) {
        res.json(card);
    } else {
        res.status(200).send('Card not found');
    }
});

//Debe de recibir un json con las cartas nuevas que se van a 
//agregar a la lista. Verifica que las cartas tengan todos los 
//atributos antes de agregarlas a la lista. Verifica que no exista 
//la carta en la lista antes de intentar agregarla. En caso de que 
//no se pueda agregar, envía un mensaje de que no se pudo agregar en 
//un json, con el código de estado adecuado. En caso de que sí se haya 
//agregado, regresa un mensaje en un json de que sí se agregó correctamente.

app.post('/cards', (req, res) => {
    const newCards = req.body;
    let addedCards = [];

    if (!Array.isArray(newCards)) {
        newCards = [newCards];
    }

    newCards.forEach((newCard) => {
        if (isValidCard(newCard) && !cardOverlap(newCard.id)) {
            cards_list.push(newCard);
            addedCards.push(newCard);
        }
    });

    if (addedCards.length > 0) {
        res.status(200).json({ message: 'cards added successfully!!', addedCards });
    } else {
        res.status(400).json({ message: 'unable to add card(s) :('});
    }
});

function isValidCard(card) {
    return (
        card.hasOwnProperty('id') &&
        card.hasOwnProperty('cardName') &&
        card.hasOwnProperty('description') &&
        card.hasOwnProperty('damage') &&
        card.hasOwnProperty('accuracy') &&
        card.hasOwnProperty('healing') &&
        card.hasOwnProperty('target') &&
        card.hasOwnProperty('art')
    );
}

function cardOverlap(cardId) {
    return cards_list.some((card) => card.id === cardId);
}

//Debe de poder borrar una carta en base a su ID. 
//Verifica que la carta exista antes de borrarla de la lista.

app.delete('/card/:id', (req, res) => {
    const cardId = req.params.id;
    const index = cards_list.findIndex((card) => card.id === parseInt(cardId));
    if (index !== -1) {
        cards_list.splice(index, 1);
        res.status(200).json({ message: 'card deleted successfully!!!!!' });
    } else {
        res.status(404).json({ message: 'card not found :(' });
    }
});

//Debe de poder actualizar una carta en base a su ID. 
//Recibe los campos que se van a actualizar en un json, 
//y solo actualiza los campos que vienen en el json. 
//Verifica que la carta exista antes de intentar actualizarla.

app.put('/card/:id', (req, res) => {
    const cardId = req.params.id;
    const updatedFields = req.body;
    const cardIndex = cards_list.findIndex((card) => card.id === parseInt(cardId));

    if (cardIndex !== -1) {
        const updatedCard = { ...cards_list[cardIndex], ...updatedFields };
        cards_list[cardIndex] = updatedCard;
        res.status(200).json({ message: 'card updated successfully!!!!', updatedCard });
    } else {
        res.status(404).json({ message: 'card not found :(' });
    }
});
