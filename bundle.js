const fs = require('fs')
const UglifyJS  = require('uglify-js');
let HTMLminify = require('html-minifier').minify;


fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist')

function addMiddleFile(content, startTag, endTag, addData){
    let prevFile = content.split(startTag)[0]
    let nextFile = content.split(endTag)[1]
    prevFile += addData
    return prevFile + nextFile
}

let result = UglifyJS.minify([
    fs.readFileSync('src/js/vars.js', "utf8"),
    fs.readFileSync('src/js/helpers.js', "utf8"),
    fs.readFileSync('src/js/wallet.js', "utf8"),
    fs.readFileSync('src/js/network.js', "utf8"), 
    fs.readFileSync('src/js/airdrop.js', "utf8"),
    fs.readFileSync('src/js/script.js', "utf8"),
    fs.readFileSync('src/js/auth.js', "utf8") 
])
let numericName = Date.now() + ""
let filename = "script" + Date.now() + ".bundle.js"


let indexFile = fs.readFileSync('src/index.html', "utf8")
let styleFile = fs.readFileSync('src/output.css', "utf8")
indexFile = addMiddleFile(
    indexFile, 
    '<!-- Start CSS -->', 
    '<!-- END CSS -->', 
    `<link href="/style.css?v=${numericName}" rel="stylesheet">`
)
indexFile = addMiddleFile(
    indexFile,
    '<!-- Start JS -->',
    '<!-- End JS -->',
    `<script src="/script.js?v=${numericName}"></script>`
)
indexFile = HTMLminify(indexFile, {
    removeComments: true,
    sortClassName: true,
    sortAttributes: true,
    collapseWhitespace: true,
})

fs.writeFileSync('dist/script.js', result.code)
fs.writeFileSync('dist/index.html', indexFile)
fs.writeFileSync('dist/style.css', styleFile)