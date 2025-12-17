let soap = require('soap');
let url = 'src/main/resources/CalculatorService.wsdl';
let args = { arg0: 7.0, arg1: 5.0 };

let calculatorPromise = soap.createClient(url);

calculatorPromise
    .then(calculator => calculator.add(args))
    .then(result => {
        console.log(args.arg0 + ' + ' + args.arg1 + ' = ' + result.return);
    })
    .catch(err => console.error('Add error:', err));

calculatorPromise
    .then(calculator => calculator.subtract(args))
    .then(result => {
        console.log(args.arg0 + ' - ' + args.arg1 + ' = ' + result.return);
    })
    .catch(err => console.error('Subtract error:', err));

calculatorPromise
    .then(calculator => calculator.multiply(args))
    .then(result => {
        console.log(args.arg0 + ' x ' + args.arg1 + ' = ' + result.return);
    })
    .catch(err => console.error('Multiply error:', err));

calculatorPromise
    .then(calculator => calculator.divide(args))
    .then(result => {
        console.log(args.arg0 + ' : ' + args.arg1 + ' = ' + result.return);
    })
    .catch(err => console.error('Divide error:', err));

calculatorPromise
    .then(calculator => calculator.computeAll(args))
    .then(result => {
        console.log(result.return);
    })
    .catch(err => console.error('ComputeAll error:', err));