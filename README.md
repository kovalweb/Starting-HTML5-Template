# Starting HTML5 Template
**Starting HTML5 Template** - lightweight startup HTML5 template with **Gulp 4, SCSS**. See demo [go to](http://wbs-dvp.pro "Demo")

## 1. Template Structure
- **build folder** - all finished files will be added to this folder after compilation, it is also called the production folder, i.e. the result of the work. The build folder will contain subfolders. They will be created automatically at compilation, so I did not specify them in the structure ( Important! Before executing the `gulp build` command, the folder build must be created in the project's root if it does not exist. ).
- **app folder** - the source files of the project will be stored here. In general, there can be a lot of files in the child folders, depending on the size of the project. Each file types are then merged into a common file and copied to the production folder. At the root is the file index.html and other *.html.
- CSS, js, images, fonts files you can find in **app** or **build** folder
- CSS files you can find in **build/assets/css** folder or **app/assets/scss** folder with sources
- JS files you can find in **build/assets/js** folder or **app/assets/js** folder with sources
- Fonts you can find in **fonts** folder

## 2. How to edit template
If you want to edit some html, css, js files, best way to use sources in app folder. You need **node.js** and **gulp** installed.

1. Open `cmd` and go to the projects folder

2. Run `npm i` to install all gulp dependencies

3. Run `gulp` run local server and start watching changes

4. Run `gulp build` to build project
	- `html:build` - to build only html files
	
	- `css:build` - to build only css files
	
	- `js:build` - to build only js files
	
	- `fonts:build` - to build only fonts files
	
	- `image:build` - to build only images files

5. Run `gulp clearcache` clearing cache

6. Run `gulp critical` critical extracts & inlines critical-path (above-the-fold) CSS from HTML. This command should be run only after the command `gulp build`

### How to work with html
Find **app folder** which includes all *.html files.

### How to change SCSS
- To change SCSS open **app/assets/scss** folder
- **style.scss** - main file which import all blocks
- All blocks you can find in **_blocks folder**
- Content el. you can find in **_content folder**
- Layouts ( header.scss, footer.scss and other.. ) you can find in **_layouts** folder
- You can change colors, sizes, font-size in **_vars.scss** file.
- **_elements_style.scss** basic style of all elements on the site

### How to change js
To change js open **app/assets/js** folder.

### How to change img
Lazy loading img & background images. Enabled by default.
- Example of the usual `<img>` tag:

```html
<img data-src="assets/img/picture.png" src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" class="lazy" alt="">
```
- **Background image** changer example:

```html
<div class="lazy" data-src="assets/img/picture.png">
```

## 3. Credits
- [jQuery](http://jquery.com/ "jQuery")
- [lazy Loading](https://github.com/eisbehr-/jquery.lazy "lazy Loading")
- [ScrollToFixed](https://github.com/bigspotteddog/ScrollToFixed "ScrollToFixed")
- [jQuery Popup Overlay](https://github.com/vast-engineering/jquery-popup-overlay "jQuery Popup Overlay")
- [Validation form](https://jqueryvalidation.org/ "Validation form")
- [Ihavecookies](https://github.com/ketanmistry/ihavecookies "Ihavecookies")
