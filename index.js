const path = require('path');
const fs = require('fs');
const { parseString, Builder } = require('xml2js');
const _ = require('lodash');

const log = feflow.log;

function formatTree(svgTree) {
    for (const key in svgTree) {
        const element = svgTree[key];

        if (_.isObject(element)) {
            svgTree[key] = formatTree(element);
        } else if (
            _.isString(element) &&
                /[\u4e00-\u9fa5]/.test(element) &&
                svgTree.$ &&
                svgTree.$.textLength
        ) {
            log.info(element);
            log.info(svgTree.$.textLength);
            delete svgTree.$.textLength;
        }
    }

    return svgTree;
}

function format(svgTrees) {
    return svgTrees.map(svgTree => formatTree(svgTree));
}

feflow.cmd.register('svgtocn', '让 SVG 文件中的中文看起来正常', function (args = {}) {
    const files = args._ || [];
    const filesPath = files.map(file => path.join(process.cwd(), file));
    const contents = filesPath.map(file => fs.readFileSync(file));
    const parsers = contents.map(content => {
        return new Promise((resolve, reject) => {
            parseString(content, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    });

    return Promise.all(parsers)
        .then(parserTrees => {
            // 深度遍历对象，判断是否存在中文，存在的话则同级的 textLength 则不设置
            const svgTrees = format(parserTrees);
            const xmls = svgTrees.map((svgTree, index) => {
                const builder = new Builder();
                const xml = builder.buildObject(svgTree);
                return fs.writeFileSync(path.join(process.cwd(), 'convert-' + files[index]), xml);
            });

            return xmls;
        })
        .catch(error => log.error(error));
});