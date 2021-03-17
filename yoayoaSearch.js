module.exports.oneSearch = async(inp_txt,site_name = 'all')=>{
  const browser = await pptr_launch();
  return await searchSite(inp_txt,browser,site_name);
}

const pptr_launch = async ()=>{
  const puppeteer = require(`puppeteer-extra`)
  puppeteer.use(require(`puppeteer-extra-plugin-stealth`)());
  let launchoptions = {};
  launchoptions.headless = true;
  launchoptions.defaultViewport=null;
  launchoptions.ignoreDefaultArgs=['--enable-automation'];
  launchoptions.args=['--start-maximized'];
  let browser = await puppeteer.launch(launchoptions);
  return browser
}

const searchSite = async (input_text, browser, site_name)=>{
  const sites = {
    worldcat:{
      address:'https://www.worldcat.org/',
      input:'#q1',
      submit:'input[value="搜索一切"]',
      result:'#br-table-results > tbody > tr:nth-child(1) > td.result.details',
      post_process:(raw_html)=>{
        if(raw_html==''){
          return raw_html='无结果'
        }
        const raw_html_detail = raw_html.match(/.*(?=(?:<!-- collection: \/z-wcorg\/ -->))/s);
        const raw_html_detail_strip=raw_html_detail[0].replace(/^\s+|\s+$/gm, '');
        const raw_html_detail_strip_deimg=raw_html_detail_strip.replace(/<img[^>]+>/gm, '');
        const raw_html_detail_strip_deimg_recoverlink=raw_html_detail_strip_deimg.replace(/(href=")/gm, '$1https:\/\/www.worldcat.org');
        const raw_html_detail_strip_deimg_recoverlink_removenbsp=raw_html_detail_strip_deimg_recoverlink.replace(/&nbsp;/gm, '');
        return raw_html_detail_strip_deimg_recoverlink_removenbsp
      }
    },
    libgen:{
      address:'http://gen.lib.rus.ec/',
      input:'#searchform',
      submit:'input[value="Search!"]',
      result:'body > table.c > tbody > tr:nth-child(2)',
      post_process:(raw_html)=>{
        if(raw_html==''){
          return raw_html='无结果'
        }
        console.log(`libgen raw ${raw_html}`);
        const raw_html_recovertable = `<table width="100%" cellspacing="1" cellpadding="1" rules="rows" class="c" align="center"><tbody><tr valign="top" bgcolor="#C0C0C0"><td><b>ID</b></td><td><b>Author(s)</b></td><td><b>Title</b></td><td><b>Publisher</b></td><td><b>Year</b></td><td><b>Pages</b></td><td><b>Language</b></td><td><b>Size</b></td><td><b>Extension</b></td><td colspan="5"><b>Mirrors</b></td><td><b>Edit</b></td></tr>${raw_html}</tbody></table>`;
        
        return raw_html_recovertable
      }
    },
    zlib:{
      address:'https://1lib.domains/',
      input:'#searchFieldx',
      submit:'#searchForm > div.b-search-form > div > div.button.whiteShadow > div > button',
      result:'#searchResultBox > div:nth-child(2) > div > table > tbody > tr > td:nth-child(2) > table',
      post_process:(raw_html)=>{
        if(raw_html==''){
          raw_html='无结果'
        }
        return raw_html
      }
    }
  }
  let site = sites[site_name];
  let page = await browser.newPage();
  await page.setJavaScriptEnabled(enabled=true);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');
  await page.goto(site.address, options={'waitUntil': 'networkidle0'}) 
  const inputElement = await page.$(site.input)
  const placehoder = await page.evaluate(el=>el.placeholder,site.input);
  console.log(`${placehoder}`);
  await inputElement.type(input_text)//, delay=20
  // await page.waitForTimeout(1000)
  await Promise.all([
    await jsclick(site.submit, page),
    waitForNetworkIdle(page, 500, 0), 
  ]);
  const raw_html = await page.$eval(site.result,el => el.innerHTML);
  const mani_html = site.post_process(raw_html)
  return mani_html;
};


const jsclick = async (elem, page) =>{
  ele = await getPageElement(elem, page)
  await page.evaluate(el => el.click(),ele)
};

const getPageElement = async (el, page) =>{
  if (typeof el === 'string') {
    // xpath表达式
    if (/^\/\/.*/g.test(el)) {
      ele = (await page.$x(el))[0]
    } else {
      ele = await page.$(el)
    }
  }
  return ele
}

function waitForNetworkIdle(page, timeout, maxInflightRequests = 0) {
  page.on('request', onRequestStarted);
  page.on('requestfinished', onRequestFinished);
  page.on('requestfailed', onRequestFinished);

  let inflight = 0;
  let fulfill;
  let promise = new Promise(x => fulfill = x);
  let timeoutId = setTimeout(onTimeoutDone, timeout);
  return promise;

  function onTimeoutDone() {
    page.removeListener('request', onRequestStarted);
    page.removeListener('requestfinished', onRequestFinished);
    page.removeListener('requestfailed', onRequestFinished);
    fulfill();
  }

  function onRequestStarted() {
    ++inflight;
    if (inflight > maxInflightRequests)
      clearTimeout(timeoutId);
  }

  function onRequestFinished() {
    if (inflight === 0)
      return;
    --inflight;
    if (inflight === maxInflightRequests)
      timeoutId = setTimeout(onTimeoutDone, timeout);
  }
}
