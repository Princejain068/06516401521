const express=require('express');

const app = express();

app.use(express.json());

const PORT = 9876;
let shared = new Set() ;

app.get("/", (req, res) => {
    return res.status(200).send({ msg: "Nice Working" });
})

app.use("/numbers/e" , (req , res)=>{

    let preSet = Array.from(shared) ;
    let randomNumber = Math.floor(Math.random() * 90);

    let number = [] ;
    for(let i=randomNumber ; i<=100;i++){
        shared.add(i*2) ;
        number.push(i*2) ;
        if(shared.size > 10){
            let firstElement = shared.values().next().value; // Get the first element
            shared.delete(firstElement);
            
        }
    }

    let avg = 0 ;

    shared.forEach(value=>{
        avg += value ;
    })

    avg = avg/shared.size ;
    let newState = Array.from(shared) ;
    return res.status(200).json({"windowPrevState" :preSet , "WindowCurrState":newState,"numbers":number , "avg":avg})
})


app.use("numbers/p" , (req , res) =>{
    
})
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});