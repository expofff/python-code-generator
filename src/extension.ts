import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Python Code Generator extension is now active!');

    let insertIf = vscode.commands.registerCommand('python-code-generator.insertIf', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && editor.document.languageId === 'python') {
            const position = editor.selection.active;
            const indent = getCurrentIndentation(editor, position.line);
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, `${indent}if condition:\n${indent}    `);
            }).then(success => {
                if (success) {
                    const newPosition = position.with(position.line, position.character + 3);
                    editor.selection = new vscode.Selection(newPosition, newPosition);
                }
            });
        } else {
            vscode.window.showErrorMessage('This command only works in Python files!');
        }
    });

    let toUpperCase = vscode.commands.registerCommand('python-code-generator.toUpperCase', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (text) {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, text.toUpperCase());
                });
            } else {
                vscode.window.showInformationMessage('No text selected');
            }
        }
    });

    let insertFor = vscode.commands.registerCommand('python-code-generator.insertFor', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && editor.document.languageId === 'python') {
            const position = editor.selection.active;
            const indent = getCurrentIndentation(editor, position.line);
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, `${indent}for item in items:\n${indent}    `);
            });
        } else {
            vscode.window.showErrorMessage('This command only works in Python files!');
        }
    });

    let insertWhile = vscode.commands.registerCommand('python-code-generator.insertWhile', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && editor.document.languageId === 'python') {
            const position = editor.selection.active;
            const indent = getCurrentIndentation(editor, position.line);
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, `${indent}while condition:\n${indent}    `);
            });
        } else {
            vscode.window.showErrorMessage('This command only works in Python files!');
        }
    });

    let insertFunction = vscode.commands.registerCommand('python-code-generator.insertFunction', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && editor.document.languageId === 'python') {
            const position = editor.selection.active;
            const indent = getCurrentIndentation(editor, position.line);
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, `${indent}def function_name():\n${indent}    `);
            });
        } else {
            vscode.window.showErrorMessage('This command only works in Python files!');
        }
    });

    let insertClass = vscode.commands.registerCommand('python-code-generator.insertClass', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor && editor.document.languageId === 'python') {
            const position = editor.selection.active;
            const indent = getCurrentIndentation(editor, position.line);
            
            editor.edit(editBuilder => {
                editBuilder.insert(position, `${indent}class ClassName:\n${indent}    def __init__(self):\n${indent}        `);
            });
        } else {
            vscode.window.showErrorMessage('This command only works in Python files!');
        }
    });

    context.subscriptions.push(
        insertIf,
        toUpperCase, 
        insertFor, 
        insertWhile, 
        insertFunction, 
        insertClass
    );
}

function getCurrentIndentation(editor: vscode.TextEditor, line: number): string {
    const text = editor.document.lineAt(line).text;
    const match = text.match(/^(\s*)/);
    return match ? match[1] : '';
}

export function deactivate() {}