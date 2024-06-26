#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 50000);

let myBalance: number = 0;
let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "enter student name:",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a valid value.";
    },
  },
  {
    name: "courses",
    type:"list",
    message:"select courses",
    choices:["ARC GIS","TECHLOG","PETRAL","ARC MAP","RESEARCH","DATA ANALYSIS","PYTHON"]
  }
]
);

const tutionFee:{[key: string]:number}={
    "ARC GIS":15000,
    "TECHLOG":12000,
    "PETRAL":10000,
    "ARC MAP":18000,
    "RESEARCH":14000,
    "DATA ANALYSIS":16000,
    "PYTHON":13000
};
console.log(`\nTution fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`balance: $${myBalance}\n`);

let paymentType = await inquirer.prompt([{
  name: "payment",
  type: "list",
  message: "select payment method:",
  choices:["Bank tranfer","JazzCash","EasyPaisa","Payoneer","PayPal"]
},
{
  name:"amount",
  type:"input",
  message:"Tranfer payment:",
  validate: function(value){
    if (value.trim()!==""){
      return true;
    }
return "Please enter a valid amount.";
  },
}]);
console.log(`\n You select Payment method: ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if(tutionFees === paymentAmount){
  console.log(`Congratulations! You have enrolled successfully in ${answer.courses}.\n`);

  let ans= await inquirer.prompt([
    {
    name: "select",
    type: "list",
    message: "What would you like to do next?",
    choices:["View status","exit"]
   }
])
  if (ans.select === "View status"){
    console.log("\n*******STATUS*********\n");
    console.log(`\nStudent Name: ${answer.student}\n`);
    console.log(`\nStudent ID: ${randomNumber}\n`);
    console.log(`\nCourse: ${answer.courses}\n`);
    console.log(`Tution Fees paid: ${paymentAmount}/-\n`);
    console.log(`Balance: $${myBalance += paymentAmount}\n`);
  } else{
console.log("/nSuccessfully exited the program.\n");
}
}else {
console.log("invalid payment amount due to course. Please try again.\n");}