var repl = require("repl");

var Math = {
    add: function (num1, num2) {
        return (num1 + num2);
    },
    multiply: function (num1, num2) {
        return (num1 * num2);
    },
}

var replServer = repl.start({
    prompt: "my-math > ",
});

replServer.context.Math = Math;