function getData(uId){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            console.log("Fetched the data!");
            resolve("skc@gmail.com");
        }, 3000);
    });
}

let email;
console.log("start");
getData("skc")
.then((result)=>{
    email=result;
    console.log("Email id of the user id is: " + email);
    console.log("end");
});

//using async-await

async function getDataAsync(uId){
    let promise=new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Fetched the data!");
            resolve("skc@gmail.com");
        }, 4000);
    });

    console.log("start");
    let res=await promise;
    console.log("Email id of the user id is: " + email);
    console.log("end");

    return promise;
}

getDataAsync("skc");

getDataAsync("skc")
.then((res)=>{
    console.log("outside email :"+res);
})