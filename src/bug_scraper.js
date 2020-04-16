const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  //page.setViewport({width:1024, height:760})
  await page.goto('https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)');

  const bugs = await page.evaluate(() => {
    const rows =document.querySelectorAll('.tabbertab table table tr');
    return Array.from(rows, row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText)
    })
  })
  
  const northern_bugs = bugs.slice(1,80)
  const southern_bugs =  bugs.slice(82, bugs.length)
  
  const northern_bugs_json = JSON.stringify(northern_bugs)

  const southern_bugs_json = JSON.stringify(northern_bugs)
  
  const fs = require('fs');
  fs.writeFile('srcnorthern_bugs.json', northern_bugs_json, 'utf8', function(err){
    if (err) console.log(err)
  });
  fs.writeFile('southern_bugs.json', southern_bugs_json, 'utf8', function(err){
    if (err) console.log(err)
  });
  await browser.close();
})();