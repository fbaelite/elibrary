import fetch from 'node-fetch';

const folders = [
  { name: "Template CV", url: "https://drive.google.com/drive/folders/1JMn5twuVJQ5m3crgAQa1eQRjOSmMsC_J" },
  { name: "CFA", url: "https://drive.google.com/drive/u/4/folders/1MjxHmSrzLIJiy0Xq3-bzICptRJ1G4mjA" },
  { name: "Slide templates", url: "https://drive.google.com/drive/folders/1jFCYVd37MUQCoPG5odZ1pAJdZ_AZMe6U" },
  { name: "Ebooks Tâm lí", url: "https://drive.google.com/drive/folders/1xKNPFV8-i_IGjztp78r8mhocW3aVTmMv" },
  { name: "The body keeps the scores", url: "https://drive.google.com/file/d/1RwbMFaiH2EPKCmyFtgp9moIpSHCNKxa6/view" }
];

async function scanEmbedded(f) {
  try {
    const res = await fetch(f.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    
    // Pattern to match any 33-char ID starting with 1
    const regex = /\b1[a-zA-Z0-9_-]{32}\b/g;
    const matches = [...html.matchAll(regex)].map(m => m[0]);
    
    const folderIdMatch = f.url.match(/(?:folders\/|u\/\d+\/folders\/|d\/)([^?&/]+)/);
    const folderId = folderIdMatch ? folderIdMatch[1] : '';
    
    const candidates = [...new Set(matches)].filter(id => id !== folderId);
    console.log(`[${f.name}] Found ${candidates.length} candidate IDs. Testing first 25...`);
    
    const results = await Promise.all(candidates.slice(0, 25).map(async (id) => {
      const url = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
      try {
        const check = await fetch(url, { 
          method: 'HEAD',
          headers: { 'User-Agent': 'Mozilla/5.0' },
          timeout: 4000
        });
        if (check.status === 200) {
          const type = check.headers.get('content-type');
          if (type && type.startsWith('image/')) {
            return id;
          }
        }
      } catch (e) {}
      return null;
    }));
    
    const valid = results.filter(id => id !== null);
    console.log(`[${f.name}] Valid:`, valid);
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  for (const f of folders) {
    await scanEmbedded(f);
  }
}

run();
