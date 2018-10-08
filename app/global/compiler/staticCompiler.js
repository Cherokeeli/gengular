/**
 * 静态模板编译，将ejs模板通过json定义的规则编译成template.html
 */

const ejs = require('ejs');
const fs = require('fs');

// console.log(configJson);
// console.log(process.argv);
let jsonIndex = process.argv.indexOf('--config');
let templateIndex = process.argv.indexOf('--template');
let nameIndex = process.argv.indexOf('--name');
if(jsonIndex > -1 && templateIndex > -1) {
    if(jsonIndex+1 < process.argv.length && templateIndex+1 < process.argv.length)
    console.log(process.argv[jsonIndex+1]);
    fs.readFile(process.argv[jsonIndex+1], 'utf8', (err, configJson) => {
        if(err) throw err;
        // console.log(configJson, templateStr);
        fs.readFile(process.argv[templateIndex+1], 'utf8', (err, templateStr) => {
            if(err) throw err;
            console.log(configJson, templateStr);
            let renderedTemplate = ejs.render(templateStr, JSON.parse(configJson));
            console.log(renderedTemplate);
            fs.writeFile(`./output.template.html`, renderedTemplate, err => {
                console.log(err);
            })
        });
    });
}