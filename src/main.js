'use strict';

const vscode = require('vscode');
const DefinitionProvider = require('./lib/definition-provider');

module.exports = {
  activate (context) {
    const config = vscode.workspace.getConfiguration('javascript.commonjs.resolve');

    context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(
        'javascript', new DefinitionProvider(config)
      )
    );
  },
  deactivate () { }
};
