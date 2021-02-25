const puppeteer = require('puppeteer');

// UNIT TESTING
const { generateText, checkAndGenerate } = require('./util');

test("should output name and age", () => {
    const data = ['Anna', 30]
    expect(generateText('Anna', 30)).toBe('Anna (30 years old)');
})

test('should output data-less text', () => {
    const text = generateText("", null);
    expect(text).toBe(" (null years old)")
    const text2 = generateText();
    expect(text2).toBe("undefined (undefined years old)")
})

// INTEGRATION TESTING
test('should generate a valid text output', () => {
    const text = checkAndGenerate("Anna", 29);
    expect(text).toBe('Anna (29 years old)');
})

// END TO END TESTING
test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // sloMo: 80, //commenting those pointes, we prevent the test to go through a real browser -> headless browser
        // args: ['--window-size=1920,1080'] //now does it behind the scenes
    })
    const page = await browser.newPage()
    await page.goto('file:///D:/CODES/projects/random/testing_unit-integration-e2e_js/index.html');

    await page.click('input#name');
    await page.type('input#name', 'Anna')
    await page.click('input#age');
    await page.type('input#age', '30')
    await page.click('#btnAddUser')

    const finalText = await page.$eval('.user-item', el => el.innerHTML)
    expect(finalText).toBe('Anna (30 years old)')
})