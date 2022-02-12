export function Readline(query : string) : Promise<string> {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    return  new Promise(resolve => 
      readline.question(query, 
        (ans : string) => {
      readline.close();
      resolve(ans);
  }))
  }

