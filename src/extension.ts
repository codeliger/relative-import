// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import * as vscode from 'vscode';

function getCurrentPath(): string {
  const activeEditor = vscode.window.activeTextEditor;
  const document = activeEditor && activeEditor.document;
  return (document && document.fileName) || "";
}


function splitPath(path: string) {
		let delimiter = "/"
		if (path.includes("\\\\")) {
			delimiter = "\\\\"
    }
		let parts = path.split(delimiter) 
		parts.shift()
		return parts
}

// /home/codeliger/go/src/gitlab.com/datavalet/skypiea/dot/dotweb/website/src/components/filters/locations/LocationPicker.svelte
// /home/codeliger/go/src/gitlab.com/datavalet/skypiea/dot/dotweb/website/src/components/filters/development/dataview/SoftwarePicker.svelte
// /home/codeliger/go/src/gitlab.com/datavalet/skypiea/dot/dotweb/website/src/components/filters/locations/details/errors/LocationPicker.svelte
// ../development/dataview/SoftwarePicker.svelte

// /home/codeliger/go/src/gitlab.com/datavalet/skypiea/common/web/components/general/Dropdown.svelte
export function RelativeCommonAncestor(to: string, from: string, seperator = "/") { 
	let importingTo = splitPath(to);
  let importingFrom = splitPath(from);
	let newRelativePath = []
	let a = 0
	let b = 0
	let foundAncestor = false

	while (a < importingTo.length-1 || b < importingFrom.length-1){
		if (a < importingTo.length-1 && b < importingFrom.length-1) {
			if (!foundAncestor && importingTo[a] != importingFrom[b]){
				foundAncestor = true
			}
			if (foundAncestor) {
				newRelativePath.unshift("..");
        newRelativePath.push(importingFrom[b]);
			}
			a++;
			b++;
		}
		else if (a < importingTo.length-1) {
			newRelativePath.unshift("..");
			a++
		}else if (b < importingFrom.length-1) {
			if (newRelativePath.length == 0) {
				newRelativePath.unshift('.')
			}
			newRelativePath.push(importingFrom[b])
			b++
		}
	}

	if (newRelativePath.length == 0) {
    newRelativePath.unshift(".");
  }
	newRelativePath.push(importingFrom[importingFrom.length-1])
	return newRelativePath.join(seperator)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "relative-import" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('relative-import.relativePathDiff', (params) => {
		let selectedFilePath = params.path
		// The code you place here will be executed every time your command is executed
		let activeFilePath = getCurrentPath()

		if (activeFilePath === ""){
			vscode.window.showErrorMessage("You must have a file opened");
		}

		if (selectedFilePath === activeFilePath) {
			let path = "./" + vscode.workspace.asRelativePath(activeFilePath);
			vscode.env.clipboard.writeText(path);
			vscode.window.showInformationMessage("Relative path diff copied");
		}else {
			let newPath = RelativeCommonAncestor(activeFilePath, selectedFilePath);
			console.log(newPath)
			vscode.env.clipboard.writeText(newPath);
			vscode.window.showInformationMessage("Relative path diff copied");
		}
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
