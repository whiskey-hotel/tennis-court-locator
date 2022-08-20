/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
import fs from 'fs';

const csv = fs.readFileSync('/Users/justin/TheOdinProject/tennis-court-locator/tennis_courts.csv');

const array = csv.toString().split('\n');
const result = [];
const headers = array[0].split(',');
for (let i = 1; i < array.length - 1; i++) {
  const obj = {};

  const str = array[i];
  const regex = /[,](?=(?:\w|[-]\d+\.\d+|["]))/;
  const properties = str.split(regex);

  for (const j in headers) {
    obj[headers[j]] = properties[j];
  }

  result.push(obj);
}

const json = JSON.stringify(result);
fs.writeFileSync('/Users/justin/TheOdinProject/tennis-court-locator/tennis_courts.json', json);
