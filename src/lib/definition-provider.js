'use strict';
const moduleExtractor = require('./module-extractor');
const resolveModule = require('resolve');
const path = require('path');
const vscode = require('vscode');

class DefinitionProvider {

  constructor (options) {
    this._options = options;
  }

  provideDefinition (document, position) {
    const line = document.lineAt(position.line);

    if (line.isEmpty) {
      return null;
    }

    return moduleExtractor
      .findAll(line.text)
      .then(modules => {
        return modules.find((item) => {
          const moduleName = item.data[3];
          const strStart = item.start + item.data[0].indexOf(moduleName);
          const strEnd = strStart + moduleName.length;

          return position.character >= strStart && position.character <= strEnd;
        });
      })
      .then(moduleToFind => moduleToFind && moduleToFind.data[3])
      .then(moduleToFind => {
        if (moduleToFind) {
          return new Promise((resolve) => {
<<<<<<< HEAD
            const opts = this._options;
            opts.basedir = path.dirname(document.fileName);

            resolveModule(moduleToFind, opts, (err, data) => {
=======
            resolveModule(moduleToFind, {basedir: path.dirname(document.fileName)}, (err, data) => {
>>>>>>> bd76d359e7dc6683b2dec4b293814b1fe6a9648d
              if (err) {
                return null;
              }

              return resolve(data);
            });
          });
        }
      })
      .then(target => target && (new vscode.Location(vscode.Uri.file(target), new vscode.Position(0, 0))))
      .catch(err => console.log(err));
  }

  dispose () {
    // Nothing to do here;
  }

}

module.exports = DefinitionProvider;
