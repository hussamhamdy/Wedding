const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
http.createServer((req,res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) {res.writeHead(403); return res.end();}
  try {if (fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  } catch {res.writeHead(404); res.end('Not found');}
}).listen(8001,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8001/designs.html'));
