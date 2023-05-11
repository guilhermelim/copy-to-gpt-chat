import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

async function copyFile(uri: vscode.Uri) {
  let data = await vscode.workspace.fs.readFile(uri);
  let content = new TextDecoder("utf-8").decode(data);

  let filePath = vscode.workspace.asRelativePath(uri);
  let projectName = vscode.workspace.name || "Unknown";
  let fileExtension = path.extname(uri.fsPath).slice(1);

  return `
===============================
Project Name: '${projectName}'
File Path: '${filePath}'
File Content:
\`\`\`${fileExtension}
${content}
\`\`\`
===============================
`;
}

async function readDirectoryRecursive(uri: vscode.Uri): Promise<vscode.Uri[]> {
  let files = await vscode.workspace.fs.readDirectory(uri);
  let fileUris: vscode.Uri[] = [];

  for (let [fileName, fileType] of files) {
    let fileUri = vscode.Uri.joinPath(uri, fileName);
    if (fileType === vscode.FileType.Directory) {
      let subDirectoryFiles = await readDirectoryRecursive(fileUri);
      fileUris.push(...subDirectoryFiles);
    } else if (fileType === vscode.FileType.File) {
      fileUris.push(fileUri);
    }
  }

  return fileUris;
}

async function copyDirectory(uri: vscode.Uri) {
  let directoryPath = vscode.workspace.asRelativePath(uri);
  let projectName = vscode.workspace.name || "Unknown";

  let toCopy = `
===============================
Project Name: '${projectName}'
Directory Path: '${directoryPath}'
===============================
`;

  let fileUris = await readDirectoryRecursive(uri);
  for (let fileUri of fileUris) {
    toCopy += await copyFile(fileUri);
  }

  return toCopy;
}

export function activate(context: vscode.ExtensionContext) {
  let disposableFile = vscode.commands.registerCommand(
    "extension.copyToGptChat",
    async (uri: vscode.Uri) => {
      let toCopy = await copyFile(uri);
      await vscode.env.clipboard.writeText(toCopy);
    }
  );

  let disposableDirectory = vscode.commands.registerCommand(
    "extension.copyDirectoryToGptChat",
    async (uri: vscode.Uri) => {
      let toCopy = await copyDirectory(uri);
      await vscode.env.clipboard.writeText(toCopy);
    }
  );

  context.subscriptions.push(disposableFile, disposableDirectory);
}

export function deactivate() {}
