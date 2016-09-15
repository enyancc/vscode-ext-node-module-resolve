# [vscode-ext-node-module-resolve](https://github.com/naumovs/vscode-ext-node-module-resolve)

Provides definitions for commonjs requires in your code for quick navigation. Works with commonjs modules and import module system.

Inspired by HookyQR's Node Module Creator and Viewer, this extension provides similar funcitonality with better module resolving system in cost of much less resources needed.
You should use only one extension at the same time for the better experience.

## Install

In VSC press Ctrl+Shift+P (Cmd+Shift+P on Mac) then type ">ext install", hit enter, search "Node modules resolve".

Still confused? Click "Get Started" above.

## Usage

You can navigate to the module in 2 ways:

 - Set your cursor inside to the module name string and click F12.
 - Hold CMD or CTRL key and hover over the module name. It will become underlined if the dependancy is resolved and it will show the popup with the code lens.

## Changelist
#### 1.0.2
 - Fix for new version

#### 1.0.1
 - Enable plugin in JavascriptReact, TypeScript and TypeScriptReact

#### 1.0.0
 - Initial release

## Configuration
You can configure this plugin via the "javascript.commonjs.resolve" properties in your workspace/user preferences.

## Contribution

Feel free to contribute!