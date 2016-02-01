'use strict';
const requireRe = /(require\s*\(\s*)(['"])(.*?[^\\])\2\s*\)/g;
const importRe = /(import\s+(?:.*?\s+from\s+)?)(['"])(.*?[^\\])\2/g;

module.exports = {
  findAll: findAll
};

function findAll (text) {
  return Promise.all([
    findAllRegex(requireRe, text),
    findAllRegex(importRe, text)
  ]).then(data => {
    let results = [];

    data.forEach(item => results = results.concat(item));

    return results;
  });
}

function findAllRegex (expr, text) {
  return new Promise((resolve, reject) => {
    let match = expr.exec(text);
    let result = [];

    while (match !== null) {
      try {
        result.push({
          start: match.index,
          end: expr.lastIndex,
          data: match
        });
      } catch (e) {}

      match = expr.exec(text);
    }

    resolve(result);
  });
}


