import fetch from 'node-fetch';

const urls = {
  "Template CV": "https://drive.google.com/drive/folders/1JMn5twuVJQ5m3crgAQa1eQRjOSmMsC_J",
  "CFA": "https://drive.google.com/drive/u/4/folders/1MjxHmSrzLIJiy0Xq3-bzICptRJ1G4mjA",
  "Slide templates": "https://drive.google.com/drive/folders/1jFCYVd37MUQCoPG5odZ1pAJdZ_AZMe6U"
};

async function dumpText(name, url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    console.log(`\n=== ALL STRINGS FOR ${name} ===`);
    
    // Find everything in format ["string", "string", ...]
    const stringRegex = /"([^"\\]{3,100})"/g;
    const strings = [];
    let match;
    while ((match = stringRegex.exec(html)) !== null) {
      strings.push(match[1]);
    }
    
    const uniqueStrings = [...new Set(strings)];
    
    // Filter down to strings containing common words or characters ofintérêt
    const filtered = uniqueStrings.filter(s => 
      s.includes('CV') || 
      s.includes('Template') || 
      s.includes('CFA') || 
      s.includes('Slide') || 
      s.includes('Bản') || 
      s.includes('Tài liệu') ||
      s.includes('Học') ||
      s.includes('Đại')
    );
    
    console.log(`Interesting strings (${filtered.length}):`, filtered);
    
    // If we have none, print the first 50 short strings that are not plain HTML boilerplate
    if (filtered.length === 0) {
      console.log(`First 60 short strings:`, uniqueStrings.slice(0, 60));
    }
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  for (const [name, url] of Object.entries(urls)) {
    await dumpText(name, url);
  }
}

run();
