import * as vscode from 'vscode';

/**
 * Основная функция активации расширения Python Code Generator
 * Вызывается автоматически VS Code при загрузке плагина
 * Регистрирует все команды и инициализирует состояние расширения
 * @param context - Контекст расширения для управления подписками и жизненным циклом
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Python Code Generator extension is now active!');

    /**
     * Команда для вставки шаблона условного оператора if
     * Вставляет "if condition:" с правильными отступами и позиционирует курсор
     * @throws Показывает ошибку если вызвана не в Python файле
     */
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

    /**
     * Команда для преобразования выделенного текста в верхний регистр
     * Работает в любых файлах, требует выделения текста
     * @throws Показывает предупреждение если текст не выделен
     */
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

    /**
     * Команда для вставки шаблона цикла for
     * Вставляет "for item in items:" с правильными отступами
     * @throws Показывает ошибку если вызвана не в Python файле
     */
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

    /**
     * Команда для вставки шаблона цикла while
     * Вставляет "while condition:" с правильными отступами
     * @throws Показывает ошибку если вызвана не в Python файле
     */
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

    /**
     * Команда для вставки шаблона определения функции
     * Вставляет "def function_name():" с правильными отступами
     * @throws Показывает ошибку если вызвана не в Python файле
     */
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

    /**
     * Команда для вставки шаблона определения класса
     * Вставляет класс с конструктором __init__ и правильными отступами
     * @throws Показывает ошибку если вызвана не в Python файле
     */
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

    /**
     * Команда для преобразования выделенного текста в нижний регистр
     * Работает в любых файлах, требует выделения текста
     * @throws Показывает предупреждение если текст не выделен
     */
    let toLowerCase = vscode.commands.registerCommand('python-code-generator.toLowerCase', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (text) {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, text.toLowerCase());
                });
            } else {
                vscode.window.showInformationMessage('No text selected');
            }
        }
    });

    /**
     * Команда для преобразования текста в Title Case (Каждое Слово С Заглавной Буквы)
     * Работает в любых файлах, требует выделения текста
     * @throws Показывает предупреждение если текст не выделен
     */
    let toTitleCase = vscode.commands.registerCommand('python-code-generator.toTitleCase', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (text) {
                const titleCaseText = text.replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, titleCaseText);
                });
            } else {
                vscode.window.showInformationMessage('No text selected');
            }
        }
    });

    /**
     * Команда для инвертирования регистра выделенного текста
     * Преобразует верхний регистр в нижний и наоборот
     * Работает в любых файлах, требует выделения текста
     * @throws Показывает предупреждение если текст не выделен
     */
    let invertCase = vscode.commands.registerCommand('python-code-generator.invertCase', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            
            if (text) {
                const invertedText = text.split('').map(char => {
                    if (char === char.toUpperCase()) {
                        return char.toLowerCase();
                    } else {
                        return char.toUpperCase();
                    }
                }).join('');
                
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, invertedText);
                });
            } else {
                vscode.window.showInformationMessage('No text selected');
            }
        }
    });

    // Регистрируем все команды в контексте расширения для управления их жизненным циклом
    context.subscriptions.push(
        insertIf,
        toUpperCase,
        insertFor,
        insertWhile,
        insertFunction,
        insertClass,
        toLowerCase,
        toTitleCase,
        invertCase
    );
}

/**
 * Вспомогательная функция для определения текущих отступов строки
 * Анализирует начало строки с помощью регулярного выражения для поиска пробельных символов
 * Поддерживает как пробелы, так и табуляцию
 * @param editor - Активный текстовый редактор VS Code
 * @param line - Номер строки для анализа (начинается с 0)
 * @returns Строка, содержащая пробелы и/или табы отступа, или пустую строку если отступов нет
 * 
 * @example
 * // Для строки "    if condition:" возвращает "    "
 * const indent = getCurrentIndentation(editor, 0);
 * 
 * @example
 * // Для строки "def function():" возвращает ""
 * const indent = getCurrentIndentation(editor, 1);
 */
function getCurrentIndentation(editor: vscode.TextEditor, line: number): string {
    const text = editor.document.lineAt(line).text;
    const match = text.match(/^(\s*)/);
    return match ? match[1] : '';
}

/**
 * Функция деактивации расширения
 * Вызывается при выгрузке плагина из памяти VS Code
 * В текущей реализации не требует дополнительной очистки ресурсов,
 * так как VS Code автоматически управляет подписками через context.subscriptions
 */
export function deactivate() {}