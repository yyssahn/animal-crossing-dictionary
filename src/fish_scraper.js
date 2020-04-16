const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  //page.setViewport({width:1024, height:760})
  await page.goto('https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)');

  //const stuff = await page.evalueate(()=>{return document.querySelector('tbody').innerHTML});
  const fishes = await page.evaluate(() => {
    const rows =document.querySelectorAll('.tabbertab table table tr');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText)
    })
  })
  
  const northern_fishes = fishes.slice(1,80)
  const southern_fishes =  fishes.slice(82, fishes.length)
  
  const northern_fishes_json = JSON.stringify(northern_fishes)

  const southern_fishes_json = JSON.stringify(northern_fishes)
  
  const fs = require('fs');
  fs.writeFile('northern_fishes.json', northern_fishes_json, 'utf8', function(err){
    if (err) console.log(err)
  });
  fs.writeFile('southern_fishes.json', southern_fishes_json, 'utf8', function(err){
    if (err) console.log(err)
  });
  await browser.close();
})();