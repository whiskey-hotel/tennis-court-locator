import fs from 'fs';

const csv = fs.readFileSync('/Users/justin/TheOdinProject/tennis-court-locator/tennis_courts.csv');

const array = csv.toString().split("\n");
const result = [];
const headers = array[0].split(",");
for (let i = 1; i < array.length - 1; i++) {
    let obj = {}
   
    let str = array[i]  
    const regex = /[,](?=(?:\w|[-]\d+\.\d+|["]))/; 
    let properties = str.split(regex)
   
    for (let j in headers) {
     obj[headers[j]] = properties[j]
    }
   
    result.push(obj)
  }
 
let json = JSON.stringify(result);
fs.writeFileSync('/Users/justin/TheOdinProject/tennis-court-locator/tennis_courts.json', json);