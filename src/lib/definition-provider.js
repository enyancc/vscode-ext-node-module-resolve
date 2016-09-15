'use strict';
const moduleExtractor = require('./module-extractor');
const resolveModule = require('resolve');
const path = require('path');
const vscode = require('vscode');

class DefinitionProvider {

  constructor (options) {
    this._options = Object.assign({}, options);
  }

  provideDefinition (document, position) {
    const line = document.lineAt(position.line);

    if (line.isEmpty) {
      return null;
    }

    return moduleExtractor
      .findAll(line.text)
      .then(modules => this.filterRequest(modules, position))
      .then(target => target && this.resolveModule(target, document))
      .then(target => target && this.filterEs6(target))
      .then(target => target && (new vscode.Location(vscode.Uri.file(target.resolved), new vscode.Range(0, 0, 1, 0))))
      .catch(err => console.log(err) && Promise.resolve(null));
  }

  filterRequest (modules, position) {
    return modules.find((item) => {
      const moduleName = item.data[3];
      const strStart = item.start + item.data[0].indexOf(moduleName);
      const strEnd = strStart + moduleName.length;

      item.type = ~item.data[1].indexOf('import') ? 'import' : 'require';

      return position.character >= strStart && position.character <= strEnd;
    });
  }

  resolveModule (target, document) {
    if (!target) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      const opts = this._options;
      opts.basedir = path.dirname(document.fileName);

      resolveModule(target.data[3], opts, (err, data) => {
        if (err) {
          return reject('File not found');
        }

        target.resolved = data;

        return resolve(target);
      });
    });
  }

  filterEs6 (target) {
    const moduleName = target.data[3];

    if (target.type === 'import' && moduleName[0] === '.') {
      const moduleWithoutRelativeDots = moduleName.replace(/^(\.+[\/\\])+/gi, '');

      const testRe = new RegExp(`${moduleWithoutRelativeDots}(.js)?$`, 'i');

      if (testRe.test(target.resolved)) {
        return null;
      }
    }

    return target;
  }

  dispose () {
    // Nothing to do here;
  }

}

module.exports = DefinitionProvider;
