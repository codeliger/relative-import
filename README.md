# Relative Import Path Diff

This adds a button to the Explorer (workspace file tree) that allows you to copy the relative path diff

1. Open a file you want to import to
2. Right click on a file in the tree and select `Copy Relative Path Diff`

Example:

> You want to import this component into webpage.js

The component you want to import:

`/home/username/project2/subproject2.1/javascript/ts/reusable/ui/component.js`

The location of the webpage you have currently open:

`/home/username/project1/subproject1.1/javascript/ts/webpage.js`

The relative path you need to import:

../../../../project2/subproject2.1/javascript/ts/reusable/ui/component.js

This extension calculates the path diff and pastes the result

