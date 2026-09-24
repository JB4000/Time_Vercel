// import Express
const express = require('express');

// Instantiate an instance of Express to be our server
const app = express();

// Middlware for the server to parse the body of requests
app.use(express.json());


// All the hardcoded initial historical events
const events = [
    {
        id: 1,
        title: 'First Moon landing',
        startDate: '1969-07-20',
        endDate: '1969-07-20',
        category: 'science'
    },
    {
        id: 2,
        title: 'First email sent',
        startDate: '1971-10-29',
        endDate: '1971-10-29',
        category: 'technology'
    },
    {
        id: 3,
        title: 'Microsoft founded',
        startDate: '1975-04-04',
        endDate: '1975-04-04',
        category: 'technology'
    },
    {
        id: 4,
        title: 'Apple founded',
        startDate: '1976-04-01',
        endDate: '1976-04-01',
        category: 'technology'
    },
    {
        id: 5,
        title: 'Star Wars released',
        startDate: '1977-05-25',
        endDate: '1977-05-25',
        category: 'culture'
    },
    {
        id: 6,
        title: 'MTV launches',
        startDate: '1981-08-01',
        endDate: '1981-08-01',
        category: 'culture'
    },
    {
        id: 7,
        title: 'Commodore 64 released',
        startDate: '1982-01-07',
        endDate: '1982-01-07',
        category: 'technology'
    },
    {
        id: 8,
        title: 'First Macintosh released',
        startDate: '1984-01-24',
        endDate: '1984-01-24',
        category: 'technology'
    },
    {
        id: 9,
        title: 'Live Aid concert',
        startDate: '1985-07-13',
        endDate: '1985-07-13',
        category: 'culture'
    },
    {
        id: 10,
        title: 'Chernobyl disaster',
        startDate: '1986-04-26',
        endDate: '1986-04-26',
        category: 'history'
    },
    {
        id: 11,
        title: 'Berlin Wall opens',
        startDate: '1989-11-09',
        endDate: '1989-11-09',
        category: 'history'
    },
    {
        id: 12,
        title: 'World Wide Web goes public',
        startDate: '1991-08-06',
        endDate: '1991-08-06',
        category: 'technology'
    },
    {
        id: 13,
        title: 'Jurassic Park released',
        startDate: '1993-06-11',
        endDate: '1993-06-11',
        category: 'culture'
    },
    {
        id: 14,
        title: 'PlayStation launches',
        startDate: '1994-12-03',
        endDate: '1994-12-03',
        category: 'gaming'
    },
    {
        id: 15,
        title: 'Windows 95 released',
        startDate: '1995-08-24',
        endDate: '1995-08-24',
        category: 'technology'
    },
    {
        id: 16,
        title: 'DVD launches in Japan',
        startDate: '1996-11-01',
        endDate: '1996-11-01',
        category: 'technology'
    },
    {
        id: 17,
        title: 'Google founded',
        startDate: '1998-09-04',
        endDate: '1998-09-04',
        category: 'technology'
    },
    {
        id: 18,
        title: 'The Matrix released',
        startDate: '1999-03-31',
        endDate: '1999-03-31',
        category: 'culture'
    },
    {
        id: 19,
        title: 'Øresund Bridge opens',
        startDate: '2000-07-01',
        endDate: '2000-07-01',
        category: 'denmark'
    },
    {
        id: 20,
        title: 'Wikipedia launches',
        startDate: '2001-01-15',
        endDate: '2001-01-15',
        category: 'internet'
    },
    {
        id: 21,
        title: 'September 11 attacks',
        startDate: '2001-09-11',
        endDate: '2001-09-11',
        category: 'history'
    },
    {
        id: 22,
        title: 'First Harry Potter movie released',
        startDate: '2001-11-16',
        endDate: '2001-11-16',
        category: 'culture'
    },
    {
        id: 23,
        title: 'Copenhagen Metro opens',
        startDate: '2002-10-19',
        endDate: '2002-10-19',
        category: 'denmark'
    },
    {
        id: 24,
        title: 'Facebook launches',
        startDate: '2004-02-04',
        endDate: '2004-02-04',
        category: 'internet'
    },
    {
        id: 25,
        title: 'YouTube founded',
        startDate: '2005-02-14',
        endDate: '2005-02-14',
        category: 'internet'
    },
    {
        id: 26,
        title: 'Twitter launches',
        startDate: '2006-07-15',
        endDate: '2006-07-15',
        category: 'internet'
    },
    {
        id: 27,
        title: 'iPhone introduced',
        startDate: '2007-01-09',
        endDate: '2007-01-09',
        category: 'technology'
    },
    {
        id: 28,
        title: 'Spotify launches',
        startDate: '2008-10-07',
        endDate: '2008-10-07',
        category: 'culture'
    },
    {
        id: 29,
        title: 'Minecraft first public release',
        startDate: '2009-05-17',
        endDate: '2009-05-17',
        category: 'gaming'
    },
    {
        id: 30,
        title: 'Instagram launches',
        startDate: '2010-10-06',
        endDate: '2010-10-06',
        category: 'internet'
    },
    {
        id: 31,
        title: 'Curiosity rover lands on Mars',
        startDate: '2012-08-06',
        endDate: '2012-08-06',
        category: 'science'
    },
    {
        id: 32,
        title: 'Frozen movie released',
        startDate: '2013-11-27',
        endDate: '2013-11-27',
        category: 'culture'
    },
    {
        id: 33,
        title: 'Pokémon Go launches',
        startDate: '2016-07-06',
        endDate: '2016-07-06',
        category: 'gaming'
    },
    {
        id: 34,
        title: 'Nintendo Switch launches',
        startDate: '2017-03-03',
        endDate: '2017-03-03',
        category: 'gaming'
    },
    {
        id: 35,
        title: 'First image of a black hole published',
        startDate: '2019-04-10',
        endDate: '2019-04-10',
        category: 'science'
    },
    {
        id: 36,
        title: 'WHO characterizes COVID-19 as a pandemic',
        startDate: '2020-03-11',
        endDate: '2020-03-11',
        category: 'history'
    },
    {
        id: 37,
        title: 'Perseverance lands on Mars',
        startDate: '2021-02-18',
        endDate: '2021-02-18',
        category: 'science'
    },
    {
        id: 38,
        title: 'James Webb Space Telescope launches',
        startDate: '2021-12-25',
        endDate: '2021-12-25',
        category: 'science'
    },
    {
        id: 39,
        title: 'ChatGPT released',
        startDate: '2022-11-30',
        endDate: '2022-11-30',
        category: 'technology'
    },
    {
        id: 40,
        title: 'Sinclair ZX81 released',
        startDate: '1981-03-05',
        endDate: '1981-03-05',
        category: 'technology'
    },
    {
        id: 41,
        title: 'Black Sabbath debut album released',
        startDate: '1970-02-13',
        endDate: '1970-02-13',
        category: 'music'
    },
    {
        id: 42,
        title: 'Never Gonna Give You Up - Rick Astley',
        startDate: '1987-07-27',
        endDate: '1987-07-27',
        category: 'music'
    },
    {
        id: 43,
        title: 'Nevermind - Nirvana',
        startDate: '1991-09-24',
        endDate: '1991-09-24',
        category: 'music'
    },
    {
        id: 44,
        title: 'Wannabe - Spice Girls',
        startDate: '1996-07-08',
        endDate: '1996-07-08',
        category: 'music'
    },
    {
        id: 45,
        title: 'Barbie Girl - Aqua',
        startDate: '1997-05-14',
        endDate: '1997-05-14',
        category: 'music'
    },
    {
        id: 46,
        title: 'Baby Hit Me One More Time - Britney Spears',
        startDate: '1998-10-23',
        endDate: '1998-10-23',
        category: 'music'
    },
    {
        id: 47,
        title: 'Blue (Da Ba Dee) - Eiffel 65',
        startDate: '1998-10-01',
        endDate: '1998-10-01',
        category: 'music'
    },
    {
        id: 48,
        title: 'One More Time - Daft Punk',
        startDate: '2000-11-13',
        endDate: '2000-11-13',
        category: 'music'
    },
    {
        id: 49,
        title: 'Crazy in Love - Beyoncé',
        startDate: '2003-05-14',
        endDate: '2003-05-14',
        category: 'music'
    },
    {
        id: 50,
        title: 'Hey Ya! - Outkast',
        startDate: '2003-09-09',
        endDate: '2003-09-09',
        category: 'music'
    },
    {
        id: 51,
        title: 'Axel F - Crazy Frog',
        startDate: '2005-05-17',
        endDate: '2005-05-17',
        category: 'music'
    },
    {
        id: 52,
        title: 'Arctic Monkeys debut album released',
        startDate: '2006-01-23',
        endDate: '2006-01-23',
        category: 'music'
    },
    {
        id: 53,
        title: 'Just Dance - Lady Gaga',
        startDate: '2008-04-08',
        endDate: '2008-04-08',
        category: 'music'
    },
    {
        id: 54,
        title: 'Friday - Rebecca Black',
        startDate: '2011-02-10',
        endDate: '2011-02-10',
        category: 'music'
    },
    {
        id: 55,
        title: 'Somebody That I Used to Know - Gotye',
        startDate: '2011-07-05',
        endDate: '2011-07-05',
        category: 'music'
    },
    {
        id: 56,
        title: 'Gangnam Style - PSY',
        startDate: '2012-07-15',
        endDate: '2012-07-15',
        category: 'music'
    },
    {
        id: 57,
        title: 'Get Lucky - Daft Punk',
        startDate: '2013-04-19',
        endDate: '2013-04-19',
        category: 'music'
    },
    {
        id: 58,
        title: 'Lean On - Major Lazer & DJ Snake feat. MØ',
        startDate: '2015-03-02',
        endDate: '2015-03-02',
        category: 'music'
    },
    {
        id: 59,
        title: '7 Years - Lukas Graham',
        startDate: '2015-09-18',
        endDate: '2015-09-18',
        category: 'music'
    },
    {
        id: 60,
        title: 'bad guy - Billie Eilish',
        startDate: '2019-03-29',
        endDate: '2019-03-29',
        category: 'music'
    },
    {
        id: 61,
        title: 'Christiania founded',
        startDate: '1971-09-26',
        endDate: '1971-09-26',
        category: 'denmark'
    },
    {
        id: 62,
        title: 'Denmark joins the European Communities EF',
        startDate: '1973-01-01',
        endDate: '1973-01-01',
        category: 'denmark'
    },
    {
        id: 63,
        title: 'TV 2 begins broadcasting',
        startDate: '1988-10-01',
        endDate: '1988-10-01',
        category: 'denmark'
    },
    {
        id: 64,
        title: 'Denmark wins Euro 1992',
        startDate: '1992-06-26',
        endDate: '1992-06-26',
        category: 'denmark'
    },
    {
        id: 65,
        title: 'Ungdomshuset is evicted',
        startDate: '2007-03-01',
        endDate: '2007-03-01',
        category: 'denmark'
    },
    {
        id: 66,
        title: 'Denmark wins Eurovision - Only Teardrops',
        startDate: '2013-05-18',
        endDate: '2013-05-18',
        category: 'denmark'
    },
    {
        id: 67,
        title: 'Copenhagen Metro Cityringen opens',
        startDate: '2019-09-29',
        endDate: '2019-09-29',
        category: 'denmark'
    },
    {
        id: 68,
        title: 'Frederik X becomes King of Denmark',
        startDate: '2024-01-14',
        endDate: '2024-01-14',
        category: 'denmark'
    },
    {
        id: 69,
        title: 'Pong released',
        startDate: '1972-11-29',
        endDate: '1972-11-29',
        category: 'gaming'
    },
    {
        id: 70,
        title: 'Tetris created',
        startDate: '1984-06-06',
        endDate: '1984-06-06',
        category: 'gaming'
    },
    {
        id: 71,
        title: 'Super Mario Bros. released',
        startDate: '1985-10-18',
        endDate: '1985-10-18',
        category: 'gaming'
    },
    {
        id: 72,
        title: 'Game Boy released in Japan',
        startDate: '1989-04-21',
        endDate: '1989-04-21',
        category: 'gaming'
    },
    {
        id: 73,
        title: 'Pokémon Red and Green released in Japan',
        startDate: '1996-02-27',
        endDate: '1996-02-27',
        category: 'gaming'
    },
    {
        id: 74,
        title: 'World of Warcraft released',
        startDate: '2004-11-23',
        endDate: '2004-11-23',
        category: 'gaming'
    }
];

// ID to use for the next event added by the user
// Using let because of reassignment
let nextEventId = 75;

// To make Express able to serve the files in /assets folder to the browser
app.use(express.static(__dirname + '/assets'));





// GET / endpoint that sends index.html as a response to the request when the user visits the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
})

// GET /api/events endpoint that sends all events to the frontend
app.get('/api/events', (req, res) => {
    res.status(200).send({ data: events });
})

// POST /api/events that receives and saves a new event entered by the user
app.post('/api/events', (req, res) => {

    const newEvent = {
        id: nextEventId,
        title: req.body.title,
        startDate: req.body.date,
        endDate: req.body.date,
        category: req.body.category
    };

    
    events.push(newEvent);

    // Incrementing the simulated AUTO_INCREMENT
    nextEventId++;

    // send the new event as a response
    res.status(201).send({ data: newEvent });
});










// make the Express server listen on port 8080
app.listen(8080, (error) => {
    if (error) {
        console.log('The server encountered an error at startup');
        return;
    }
    console.log('The server is running at port ', 8080);
});


