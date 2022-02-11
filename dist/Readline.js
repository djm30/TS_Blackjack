"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Readline = void 0;
function Readline(query) {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => readline.question(query, (ans) => {
        readline.close();
        resolve(ans);
    }));
}
exports.Readline = Readline;
// util.promisify(rl.question).bind(rl);
