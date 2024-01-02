/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('moviedb');

// Insert a few documents into the sales collection.
db.getCollection('movie').insertOne({


    "movieData": [
        { "name": "Halo", "desc": "Halo is set in the twenty-sixth century, with the player assuming the role of the Master Chief, a cybernetically enhanced supersoldier. The Chief is accompanied by Cortana, an artificial intelligence. Players battle aliens as they attempt to uncover the secrets of the eponymous Halo, a ring-shaped artificial world.", "image": "halo.jpg", "link": "halo.mp4" },
        { "name": "Demon Slayer", "desc": "Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.", "image": "demonslyer.jpg", "link": "demonslyer.mp4" },
        {
            "name": "Onepiece",
            "desc": "There once lived a pirate named Gol D. Roger. He obtained wealth, fame, and power to earn the title of Pirate King. When he was captured and about to be executed, he revealed that his treasure called One Piece was hidden somewhere at the Grand Line. This made all people set out to search and uncover the One Piece treasure, but no one ever found the location of Gol D. Roger's treasure, and the Grand Line was too dangerous a place to overcome. Twenty-two years after Gol D. Roger's death, a boy named Monkey D. Luffy decided to become a pirate and search for Gol D. Roger's treasure to become the next Pirate King.",
            "image": "onepiece.jpg",
            "link": "onepiece.mp4",
        },
        {
            "name": "Your Name",
            "desc": "Mitsuha is the daughter of the mayor of a small mountain town. She's a straightforward high school girl who lives with her sister and her grandmother and has no qualms about letting it be known that she's uninterested in Shinto rituals or helping her father's electoral campaign. Instead she dreams of leaving the boring town and trying her luck in Tokyo. Taki is a high school boy in Tokyo who works part-time in an Italian restaurant and aspires to become an architect or an artist. Every night he has a strange dream where he becomes...a high school girl in a small mountain town.",
            "image": "yourname.jpg",
            "link": "sparkle.mp4",
        },
        {
            "name": "Tribute",
            "desc": "Immerse yourself in the timeless allure of anime with 'Ephemeral Echoes,' a heartfelt tribute celebrating the vibrant characters and captivating narratives that have etched indelible memories in the hearts of fans, transcending the boundaries of reality and imagination.",
            "image": "tribute.jpg",
            "link": "tribute.mp4",
        },
    ]


});

// Run a find command to view items sold on April 4th, 2014
