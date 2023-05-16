# TestSnakeGame v1.1
TestSnakeGame is a simple and fun game where you control a snake and try to eat as many carrots as possible without hitting the walls or your own tail.

![TestSnakeGame](https://sun9-26.userapi.com/impg/BagL2wVI-Nu74I_oStKyRId-IdgNCt38IZIJ7Q/QLA0A05_O3I.jpg?size=888x888&quality=96&sign=bb50ad4b5bf274b9babfb6865c7c8644&type=album)

## How to play
- Use the **WASD** keys or the arrows on the screen to move the snake around the screen.
- Eat the orange carrots to grow longer and increase your score.
- Avoid collisions with the walls or your own tail, or the game will end.
- To restart the game: **Press R**.

## Installation
1. Clone the GitHub repository.
```
git clone https://github.com/PeTcHeNkA/TestSnakeGame
```
2. Install the dependencies.
```
npm i
```
3. Review the settings in the start.js file.
```
var params = {
 // The server port and address
 port: 8000,
 host: "localhost",

 // The root directory
 root: path.resolve("./"),
 file: "index.html",

 // Other options
 open: false,
 ignore: 'scss,my/templates',
 wait: 1000,
 mount: [['/components', './node_modules']],
 logLevel: 0,
 middleware: [function(req, res, next) { next(); }]
};
```
4. Start the game.
```
npm start
```