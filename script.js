let d = "Turner Seals is a hoe";
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"

const checkValue = () => {
    console.log(document.querySelector("input#Dsec").checked);
}

document.querySelector("input#Dsec").onClick((event)=> {console.log("clicked")})