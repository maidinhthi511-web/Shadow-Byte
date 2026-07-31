const fs = require('fs');
const path = require('path');
const https = require('https');

const STITCH_DIR = path.join(__dirname, '..', 'public', 'stitch');
const OUT_DIR = path.join(STITCH_DIR, 'assets');

function mkdirp(dir){
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extFromContentType(ct){
  if(!ct) return 'bin';
  if(ct.includes('png')) return 'png';
  if(ct.includes('jpeg') || ct.includes('jpg')) return 'jpg';
  if(ct.includes('svg')) return 'svg';
  if(ct.includes('gif')) return 'gif';
  if(ct.includes('webp')) return 'webp';
  return 'bin';
}

function download(url, dest){
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if(res.statusCode >= 400){
        reject(new Error(`Failed ${url} - status ${res.statusCode}`));
        res.resume();
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
      file.on('error', (err) => reject(err));
    });
    req.on('error', reject);
  });
}

async function main(){
  mkdirp(OUT_DIR);
  const files = fs.readdirSync(STITCH_DIR).filter(f => f.endsWith('.tsx'));
  const urlRegex = /https:\/\/www\.figma\.com\/api\/mcp\/asset\/([0-9a-fA-F-]{8,})/g;
  const found = new Map();

  for(const file of files){
    const content = fs.readFileSync(path.join(STITCH_DIR, file), 'utf8');
    let m;
    while((m = urlRegex.exec(content)) !== null){
      const uuid = m[1];
      const full = m[0];
      found.set(uuid, full);
    }
  }

  const entries = Array.from(found.entries());
  if(entries.length === 0){
    console.log('No figma asset URLs found in', files);
    return;
  }

  console.log(`Found ${entries.length} unique asset URLs. Downloading to ${OUT_DIR} ...`);

  for(const [uuid, url] of entries){
    try{
      // HEAD to get content-type
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          const ct = res.headers['content-type'];
          const ext = extFromContentType(ct);
          const dest = path.join(OUT_DIR, `${uuid}.${ext}`);
          // pipe the response again by downloading fully
          res.destroy();
          download(url, dest).then(() => {
            console.log('Saved', dest);
            resolve();
          }).catch(reject);
        }).on('error', reject);
      });
    }catch(err){
      console.error('Error downloading', url, err.message);
    }
  }

  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
