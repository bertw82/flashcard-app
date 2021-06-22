const express = require('express');
const { render } = require('pug');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
// also const data = require('../data/flashcardData.json').data;
const { cards } = data; // or const cards = data.cards;

router.get('/', (req,res)=>{
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}?side=question`)
});

router.get('/:id', (req, res) => {
    const side = req.query.side;

    const id = req.params.id;

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name };
   
    // res.render('card', { 
    //     prompt: cards[req.params.id].question,
    //     hint: cards[req.params.id].hint
    // });
    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
});

module.exports = router;