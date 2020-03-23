const {readFileSync, writeFileSync} = require('fs');

function cat(path) { return readFileSync(path).toString(); }

writeFileSync("nbnhhsh.user.js", `
${cat("src/header_greasey.js")}
(function() {
${cat("dist/Nbnhhsh.js")}
})();
`);
