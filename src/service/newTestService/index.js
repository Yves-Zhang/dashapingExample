import puppeteer from 'puppeteer'

const iPhone = puppeteer.devices['iPhone 6'];
const cookieStr = require('./cookie').default

async function newTest(){
  const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://test-isee.weishi.qq.com/ws/ugjihai/act_730_int/index.html');
	
	let count = 0
	let timmer = setInterval(async ()=>{
		await page.screenshot({path: `shootImg/example_${count}.png`});
		count++

		if(count === 10){
			await page.emulate(iPhone);
		}
	}, 1000)
	
	setTimeout(async ()=>{
		clearInterval(timmer)
		await browser.close();
	}, 20000)

} 

export default newTest