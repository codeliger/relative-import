import * as assert from 'assert';
import {RelativeCommonAncestor} from '../../extension'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Test path generation', () => {
	test("import path +1 import length different folder", () => {
    let importFile = "/a/b/c/d/e/h";
    let currentFile = "/a/b/c/f/g";
    let expected = "../d/e/h";
    let actual = RelativeCommonAncestor(currentFile, importFile);
    assert.strictEqual(actual, expected);
  });

	test("import path same length different folder", () => {
		let importFile = "/a/b/c/d/e";
		let currentFile = "/a/b/c/f/g";
		let expected = "../d/e";
		let actual = RelativeCommonAncestor(currentFile, importFile);
		assert.strictEqual(actual, expected);
	});

	test('import path longer than active file path by 1', () => {
		let importFile = "/a/b/c/d/e/f";
		let currentFile = "/a/b/c/d/g";
		let expected = "./e/f"
		let actual = RelativeCommonAncestor(currentFile, importFile)
		assert.strictEqual(actual, expected)
	});

	test("import path changes ancestor 1 deep", () => {
		let importFile = "/a/b/e/f";
		let currentFile = "/a/b/c/d";
		let expected = "../e/f";
		let actual = RelativeCommonAncestor(currentFile, importFile);
		assert.strictEqual(actual, expected);
	});

	test("import path changes ancestor 2 deep", () => {
		let importFile = "/a/e/f/g";
		let currentFile = "/a/b/c/d";
		let expected = "../../e/f/g";
		let actual = RelativeCommonAncestor(currentFile, importFile);
		assert.strictEqual(actual, expected);
	});

	test("import path 1 shorter than active file path", () => {
    let importFile = "/a/b/e";
    let currentFile = "/a/b/c/e";
    let expected = "../e";
    let actual = RelativeCommonAncestor(currentFile, importFile);
    assert.strictEqual(actual, expected);
  });

	test("import path 2 shorter than active file path", () => {
		let importFile = "/a/b/e";
    let currentFile = "/a/b/c/d/e";
    let expected = "../../e";
    let actual = RelativeCommonAncestor(currentFile, importFile);
    assert.strictEqual(actual, expected);
	});

	test("import path equal length to active file path", () => {
		let importFile = "/a/b/c";
    let currentFile = "/a/b/c";
    let expected = "./c";
    let actual = RelativeCommonAncestor(currentFile, importFile);
    assert.strictEqual(actual, expected);
	});
});
