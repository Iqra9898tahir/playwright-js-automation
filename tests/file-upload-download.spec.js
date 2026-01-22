import {test , expect} from '@playwright/test';
import fs from 'fs'

test ('File upload test', async ({page})=>{
    await page.goto('https://practice.expandtesting.com/upload')
    await page.setInputFiles('input[type="file"]', 'tests/data/sample.txt')
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#uploaded-files')).toContainText('sample.txt');

})

test.only('File download test',async({page})=>{
    await page.goto('https://practice.expandtesting.com/download')
    const [download] = await Promise.all([
         page.waitForEvent('download'),
         page.locator('a[href="download/xpath-css.png"]').click()
    ])
    const filePath = 'downloads/xpath-css.png'
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();

})
/*
Validate Downloaded File Content
// Read the downloaded file
const content = fs.readFileSync(filePath, 'utf-8');

// Validate content 
expect(content).toContain('This is a sample file'); 
Handle Download Failures (Assertions)
// Check if file exists first
expect(fs.existsSync(filePath)).toBeTruthy();

// Optional: Fail test if download failed
if (!fs.existsSync(filePath)) {
  throw new Error('Download failed: file does not exist!');
}
  parallel download handling
  // Example: wait for multiple downloads in parallel
const downloads = await Promise.all([
  page.waitForEvent('download'),
  page.locator('#downloadBtn1').click(),
  page.waitForEvent('download'),
  page.locator('#downloadBtn2').click()
]);

// Save them
for (const download of downloads) {
  const filePath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBeTruthy();
}
// Delete the downloaded file after test
fs.unlinkSync(filePath);
*/
