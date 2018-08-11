var quotes = [
    'Each day we stray further from god\'s light.',
    'I can\'t believe it\'s not butter.',
    'They don\'t think it be like it is but it do.',
    'OwO What\'s this?',
    'Why haven\'t you made your game yet?'
]

function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('headertext2').innerHTML = quotes[randomNumber];
}