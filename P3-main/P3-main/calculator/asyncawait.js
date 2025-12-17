const soap = require('soap');
const url = 'src/main/resources/CalculatorService.wsdl';
const args = { arg0: 7.0, arg1: 5.0 };

// Promisify any calculator method
const call = (client, method, args) =>
  new Promise((resolve, reject) => {
    client[method](args, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });

async function run() {
  try {
    const client = await soap.createClientAsync(url);

    const add = await call(client, "add", args);
    const sub = await call(client, "subtract", args);
    const mul = await call(client, "multiply", args);
    const div = await call(client, "divide", args);
    const all = await call(client, "computeAll", args);

    console.log(`${args.arg0} + ${args.arg1} = ${add.return}`);
    console.log(`${args.arg0} - ${args.arg1} = ${sub.return}`);
    console.log(`${args.arg0} x ${args.arg1} = ${mul.return}`);
    console.log(`${args.arg0} : ${args.arg1} = ${div.return}`);
    console.log(all.return);

  } catch (err) {
    console.error(err);
  }
}

run();
