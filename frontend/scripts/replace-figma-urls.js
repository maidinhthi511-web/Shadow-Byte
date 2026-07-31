const fs = require('fs');
const path = require('path');

const STITCH_DIR = path.join(__dirname, '..', 'public', 'stitch');
const ASSETS_DIR = path.join(STITCH_DIR, 'assets');

function findAssetByUuid(uuid){
  if(!fs.existsSync(ASSETS_DIR)) return null;
  const files = fs.readdirSync(ASSETS_DIR);
  for(const f of files){
    if(f.startsWith(uuid)) return f;
  }
  return null;
}

function replaceInFile(filePath){
  let content = fs.readFileSync(filePath, 'utf8');
  const urlRegex = /https:\/\/www\.figma\.com\/api\/mcp\/asset\/([0-9a-fA-F-]{8,})/g;
  let match;
  const replacedUuids = new Set();
  while((match = urlRegex.exec(content)) !== null){
    const uuid = match[1];
    if(replacedUuids.has(uuid)) continue;
    const assetFile = findAssetByUuid(uuid);
    if(assetFile){
      const localPath = `/stitch/assets/${assetFile}`;
      const remote = `https://www.figma.com/api/mcp/asset/${uuid}`;
      const remoteRegex = new RegExp(remote.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      content = content.replace(remoteRegex, localPath);
      replacedUuids.add(uuid);
      console.log(`Replaced ${uuid} -> ${localPath} in ${path.basename(filePath)}`);
    } else {
      console.warn(`Missing asset for ${uuid} referenced in ${path.basename(filePath)}`);
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

function main(){
  if(!fs.existsSync(STITCH_DIR)){
    console.error('stitch dir missing', STITCH_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(STITCH_DIR).filter(f => f.endsWith('.tsx'));
  const missing = new Set();
  for(const f of files){
    const p = path.join(STITCH_DIR, f);
    replaceInFile(p);
  }

  // generate report
  const report = [];
  report.push('# Figma Asset Replacement Report');
  report.push('Updated files:');
  for(const f of files) report.push(`- ${f}`);
  report.push('');
  report.push('Assets directory snapshot:');
  const assets = fs.existsSync(ASSETS_DIR) ? fs.readdirSync(ASSETS_DIR) : [];
  for(const a of assets) report.push(`- ${a}`);
  fs.writeFileSync(path.join(STITCH_DIR, 'download-report.md'), report.join('\n'), 'utf8');
  console.log('Wrote download-report.md');
}

main();
