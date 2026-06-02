import fetch from 'node-fetch';

const folders = [
  { name: "Template CV", url: "https://drive.google.com/drive/folders/1JMn5twuVJQ5m3crgAQa1eQRjOSmMsC_J" },
  { name: "CFA", url: "https://drive.google.com/drive/u/4/folders/1MjxHmSrzLIJiy0Xq3-bzICptRJ1G4mjA" },
  { name: "Slide templates", url: "https://drive.google.com/drive/folders/1jFCYVd37MUQCoPG5odZ1pAJdZ_AZMe6U" },
  { name: "Ebooks Tâm lí", url: "https://drive.google.com/drive/folders/1xKNPFV8-i_IGjztp78r8mhocW3aVTmMv" },
  { name: "The body keeps the scores", url: "https://drive.google.com/file/d/1RwbMFaiH2EPKCmyFtgp9moIpSHCNKxa6/view" }
];

async function scanStructure(f) {
  try {
    const res = await fetch(f.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    
    console.log(`\n=== Structure of ${f.name} ===`);
    
    // Look for string sequences of 33 chars inside JSON-like context.
    // Let's find patterns like:  [ "ID", "Name", ... ] or similar
    const matches = [...html.matchAll(/"([^"]{10,100})"/g)].map(m => m[1]);
    const pdfAndDocNames = matches.filter(name => 
      name.endsWith('.pdf') || 
      name.endsWith('.docx') || 
      name.includes('CV') || 
      name.includes('Slide') || 
      name.includes('CFA') ||
      name.toLowerCase().includes('scores') ||
      name.toLowerCase().includes('tâm lí')
    );
    
    console.log(`Found typical names:`, [...new Set(pdfAndDocNames)]);
    
    // Let's also print some lines around matches to see if they are accompanied by valid IDs.
    const lines = html.split('\n');
    const matchingLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('.pdf') || lines[i].includes('CV') || lines[i].includes('CFA')) {
        matchingLines.push(lines[i].substring(0, 300));
        if (matchingLines.length >= 3) break;
      }
    }
    console.log(`Sample lines:`, matchingLines);

  } catch (e) {
    console.error(e);
  }
}

async function run() {
  for (const f of folders) {
    await scanStructure(f);
  }
}

run();
