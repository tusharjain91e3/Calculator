
let expression = "";
let elem = "";

function clickon() {
    elem =eval(expression);
    document.getElementById("result").innerHTML =elem;
    expression=elem;
  }
  console.log(expression);

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click",(event)=>{
    const value=event.target.value;

    if(value=='c'){
      console.log(expression);
      expression="";
      document.getElementById("result").innerHTML="";
      return;
    }
    if(value=='='){
      clickon();
      return;
    }
      expression+=value;
      document.getElementById("result").innerHTML=expression;
      console.log(expression);
  }
);
}
);