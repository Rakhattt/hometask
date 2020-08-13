- 0.3.13 Fix for [#129](https://github.com/Microsoft/vscode-npm-scripts/issues/#129) Add !terminalFocus to keyboard extensions that use Ctrl + R 
- 0.3.12 Address github reported vulnerabilities.
- 0.3.11 Address github reported vulnerabilities. Migrate from tslint to eslint.
- 0.3.10 Address github reported vulnerabilities.
- 0.3.9 Address github reported vulnerabilities.
- 0.3.8 Address github reported vulnerabilities.
- 0.3.7 Add setting `npm.enableTouchbar` to control whether npm commands should be shown in the touchbar.
- 0.3.6 Add Macbook-Pro's touch bar support
- 0.3.5 add support for running `npm audit` [#62](https://github.com/Microsoft/vscode-npm-scripts/issues/#62) Handle no scripts found gracefully
- 0.3.4 fix for [#60](https://github.com/Microsoft/vscode-npm-scripts/issues/#60) Handle no scripts found gracefully
- 0.3.3 fix for [#46](https://github.com/Microsoft/vscode-npm-scripts/issues/46) Cannot read property 'uri' of undefined
- 0.3.1 fix for [#44](https://github.com/Microsoft/vscode-npm-scripts/issues/44) Exception when the workspace contains a root folder with another scheme than 'file'
- 0.3.0 support multiple root folders
- 0.2.1 fix for [#32716](https://github.com/Microsoft/vscode/issues/32716) Duplicate setting npm.runSilent
- 0.2.0 fix for [#38](https://github.com/Microsoft/vscode-npm-scripts/issues/38) After closing npm in terminal I can't run command anymore
- 0.1.9 bug fixes do not validate `yarn` managed modules with `npm` [#34](https://github.com/Microsoft/vscode-npm-scripts/issues/34)
- 0.1.7/0.1.8 bug fixes
- 0.1.6 Fully support the `includeDirectories` setting, issue [#24](https://github.com/Microsoft/vscode-npm-scripts/issues/24)
- 0.1.4/0.1.5 Handle the case that npm is not installed more gracefully
- 0.1.3 Guard against invalid package.json files issue [#77](https://github.com/Microsoft/vscode-npm-scripts/issues/77)
- 0.1.0 added support for validating module dependencies
- 0.0.21 added command to run `npm start`.
- 0.0.20 when commands are run in the terminal, then the **integrated terminal** is used.
- 0.0.16 added `npm install ` to the context menu on `package.json` in the explorer.
- 0.0.15 added setting to run npm commands with `--silent`.
- 0.0.15 tweaks to the README so that the extension is found when searching for node.
- 0.0.14 added command to terminate a running script
- 0.0.13 save workspace before running scripts, added command to run `npm run build`
- 0.0.12 added support for `npm.useRootDirectory`
- 0.0.11 added command to run `npm test`.
- 0.0.7 adding an icon and changed the display name to 'npm Script Runner'.
- 0.0.4 the keybinding was changed from `R` to `N` to avoid conflicts with the default `workbench.action.files.newUntitledFile` command.