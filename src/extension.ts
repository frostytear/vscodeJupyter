'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Jupyter } from './main';
import { LanguageProvider } from './common/languageProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let outputChannel = vscode.window.createOutputChannel('Jupyter');
    context.subscriptions.push(outputChannel);

    let jupyter = new Jupyter(outputChannel);
    context.subscriptions.push(jupyter);

    return {
        registerLanguageProvider: (language: string, provider: LanguageProvider) => {
            if (typeof language !== 'string' || language.length === 0) {
                throw new Error(`Argument 'language' is invalid`);
            }
            if (typeof provider !== 'object' || language === null) {
                throw new Error(`Argument 'provider' is invalid`);
            }
            jupyter.registerLanguageProvider(language, provider);
        }
    };
}

// this method is called when your extension is deactivated
export function deactivate() {
}