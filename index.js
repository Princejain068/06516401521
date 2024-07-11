const express=require('express');

const app = express();

app.use(express.json());

const PORT = 9876;
let shared = new Set();
let prime50 = getFirstNPrimes(50);
let fib50 = generateFibonacci(50);

app.get("/", (req, res) => {
    return res.status(200).send({ msg: "Nice Working" });
})

app.use("/numbers/e", (req, res) => {

    let preSet = Array.from(shared);
    let randomNumber = Math.floor(Math.random() * 90);

    let number = [];
    for (let i = randomNumber; i <= 100; i++) {
        shared.add(i * 2);
        number.push(i * 2);
        if (shared.size > 10) {
            let firstElement = shared.values().next().value; // Get the first element
            shared.delete(firstElement);

        }
    }

    let avg = 0;

    shared.forEach(value => {
        avg += value;
    })

    avg = avg / shared.size;
    let newState = Array.from(shared);
    return res.status(200).json({ "windowPrevState": preSet, "WindowCurrState": newState, "numbers": number, "avg": avg })
})


app.use("/numbers/p", (req, res) => {

    let preSet = Array.from(shared);
    let randomNumber = Math.floor(Math.random() * 50);

    let number = [];
    for (let i = randomNumber; i < 50; i++) {
        shared.add(prime50[i]);
        number.push(prime50[i]);
        if (shared.size > 10) {
            let firstElement = shared.values().next().value; // Get the first element
            shared.delete(firstElement);
        }
    }

    let avg = 0;

    shared.forEach(value => {
        avg += value;
    })

    avg = avg / shared.size;
    let newState = Array.from(shared);
    return res.status(200).json({ "windowPrevState": preSet, "WindowCurrState": newState, "numbers": number, "avg": avg })

})


app.use("/numbers/f", (req, res) => {
    let preSet = Array.from(shared);
    let randomNumber = Math.floor(Math.random() * 50);

    let number = [];
    for (let i = randomNumber; i < 50; i++) {
        shared.add(fib50[i]);
        number.push(fib50[i]);
        if (shared.size > 10) {
            let firstElement = shared.values().next().value; // Get the first element
            shared.delete(firstElement);
        }
    }

    let avg = 0;

    shared.forEach(value => {
        avg += value;
    })

    avg = avg / shared.size;
    let newState = Array.from(shared);
    return res.status(200).json({ "windowPrevState": preSet, "WindowCurrState": newState, "numbers": number, "avg": avg })
})


app.use("/numbers/r" , (req , res)=>{
    let preSet = Array.from(shared);
    let randomNumber = Math.floor(Math.random() * 50);


    let randomNumbers = [];
    for (let i = 0; i < 50; i++) {
        let randomNumber = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
        randomNumbers.push(randomNumber);
    }


    let number = [];
    for (let i = randomNumber; i < 50; i++) {
        shared.add(randomNumbers[i]);
        number.push(randomNumbers[i]);
        if (shared.size > 10) {
            let firstElement = shared.values().next().value; // Get the first element
            shared.delete(firstElement);
        }
    }

    let avg = 0;

    shared.forEach(value => {
        avg += value;
    })

    avg = avg / shared.size;
    let newState = Array.from(shared);
    return res.status(200).json({ "windowPrevState": preSet, "WindowCurrState": newState, "numbers": number, "avg": avg })
})
app.listen(PORT, () => {
    console.log(SERVER RUNNING ON PORT ${PORT});
});

function generateFibonacci(n) {
    let fibonacci = [0, 1]; // Start with the first two Fibonacci numbers

    for (let i = 2; i < n; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }

    return fibonacci;
}


function isFirstPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
}

function getFirstNPrimes(n) {
    let primes = [];
    let num = 2; // Starting from the first prime number

    while (primes.length < n) {
        if (isFirstPrime(num)) {
            primes.push(num);
        }
        num++;
    }

    return primes;
}