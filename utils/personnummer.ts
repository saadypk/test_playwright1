import { expect, request } from "@playwright/test";
 
export async function getPersonnummer(){
  const apiContext = await request.newContext();
  const apiUrl = 'https://skatteverket.entryscape.net/rowstore/dataset/b4de7df7-63c0-4e7e-bb59-1f156a591763';
  const response = await apiContext.get(apiUrl);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  console.log(data)
  const personnummer = data.results[0].testpersonnummer;
  console.log('Fetched personnummer:', personnummer);
  return personnummer;
}