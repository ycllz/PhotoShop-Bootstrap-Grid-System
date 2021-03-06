// Copyright 2008. WEB GROUP ProjectSoft and STUDIONIONS.  All rights reserved.
// Bootstrap Grid System.
// Develop by ProjectSoft

/**
* @@@BUILDINFO@@@ Bootstrap Grid System.jsx 
*/

/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING
<javascriptresource>
	<name>Bootstrap Сгенерировать сетку...</name>
	<about>
Скрипт автоматизации создания сетки Bootstrap в PhotoShop СS6-CC (возможно и ниже версии. Не тестировалось).
Разработчик: ProjectSoft
https://github.com/ProjectSoft-STUDIONIONS/PhotoShop-Bootstrap-Grid-System/

Copyright 2008. WEB GROUP «ProjectSoft and STUDIONIONS».  All rights reserved.
	</about>
	<category>0ps_bootstrap</category>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
*/

#target photoshop
#strict on
app.bringToFront();

var documentBootstrap,
	cols = 12,
	offset = 15,
	wDoc = 1200,
	hDoc = 768,
	resDlg = "dialog { " +
"		alignChildren: 'fill', " +
"		bstd : Group { " +
"			orientation: 'row', alignChildren: 'fill', " +
"			info: Panel { " +
"				orientation: 'column', " +
"				borderStyle: 'sunken', " +
"				text: 'Bootstrap Grid System', " +
"				alignChildren: 'fill', " +
"				mg: Group { " +
"					orientation: 'row', " +
"					alignment: 'left', " +
"					s: StaticText { " +
"						text: 'Выбор ширины шаблона' " +
"					}, " +
"					m: DropDownList { " +
"						alignment: 'left', " +
"						preferredSize: [180, 20] " +
"					} " +
"				}, " +
"				um: Panel { " +
"					orientation: 'row', " +
"					alignChildren: 'right', " +
"					borderStyle: 'sunken', " +
"					text: 'Кастомизация', " +
"					po: Group { " +
"						orientation: 'column', " +
"						alignment: 'top', " +
"						alignChildren: 'left', " +
"						s: StaticText { " +
"							text: 'Количество колонок', " +
"						}, " +
"						c: EditText { " +
"							name: 'cols', " +
"							text: '" + cols + "', " +
"							preferredSize: [50, 20], " +
"						}, " +
"						s: StaticText { " +
"							text: 'Отступы блоков', " +
"						}, " +
"						o: EditText { " +
"							name: 'offset', " +
"							text: '" + offset + "', " +
"							preferredSize: [50, 20], " +
"						}, " +
"					}, " +
"					pp: Group { " +
"						orientation: 'column', " +
"						alignment: 'top', " +
"						alignChildren: 'left', " +
"						s: StaticText { " +
"							text: 'Ширина шаблона', " +
"						}, " +
"						w: EditText { " +
"							name: 'width', " +
"							text: '" + wDoc + "', " +
"							preferredSize: [50, 20], " +
"						} " +
"					} " +
"				}, " +
"				btn: Group { " +
"					orientation: 'row', " +
"					alignment: 'right', " +
"					ok: Button { " +
"						text: 'Ok', " +
"						properties: { " +
"							name: 'ok' " +
"						} " +
"					}, " +
"					cancel: Button { " +
"						text: 'Cancel', " +
"						properties: { " +
"							name: 'cancel' " +
"						} " +
"					} " +
"				} " +
"			} " +
"		} " +
"	}",
	dlgBootstrap = new Window(resDlg, "Bootstrap Grid System"),
	listBox = dlgBootstrap.bstd.info.mg.m,
	customBox = dlgBootstrap.bstd.info.um.pp,
	buttonOk = dlgBootstrap.bstd.info.btn.ok,
	eColumnText = dlgBootstrap.bstd.info.um.po.c,
	eOffsetText = dlgBootstrap.bstd.info.um.po.o,
	eWidthText = dlgBootstrap.bstd.info.um.pp.w,
	listboxChangeHandle = function(event) {
		customBox.visible = (this.selection.index == 4);
	},
	buttonOkClickHandle = function(event) {
		cols = parseFloat(eColumnText.text);
		offset = parseFloat(eOffsetText.text);
		switch (listBox.selection.index) {
			case 0:
				wDoc = 1200;
				hDoc = 768;
				break;
			case 1:
				wDoc = 992;
				hDoc = 1200;
				break;
			case 2:
				wDoc = 768;
				hDoc = 1200;
				break;
			case 3:
				wDoc = 480;
				hDoc = 768;
				break;
			case 4:
				wDoc = parseFloat(eWidthText.text);
				hDoc = 768;
				break;
		}
		dlgBootstrap.close();
		documentBootstrap = app.documents.add (wDoc, hDoc, 72, "My Site Template", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
		gridDocument(wDoc, cols, offset);
	},
	NumericEditKeyboardHandler = function (event) {
		try {
			var keyIsOK = KeyIsNumeric (event) || KeyIsDelete (event) || KeyIsLRArrow (event) || KeyIsTabEnterEscape (event);
			if (!keyIsOK) {
				event.preventDefault();
				app.beep();
			}else {
				var val = parseFloat(this.text);
				var def;
				if(isNaN (val)) {
					try {
						event.preventDefault();
						switch(this.name){
							case 'cols':
								this.text = cols;
								break;
							case 'offset':
								this.text = offset;
								break;
							case 'width':
								this.text = wDoc;
								break;
						}
						app.beep();
					}catch(e){}
				}
			}
		}
		catch (e) {}
	},
	KeyHasModifier = function (event) {
		return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
	},
	KeyIsNumeric = function (event) {
		return  (event.keyName >= '0') && (event.keyName <= '9') && ! KeyHasModifier (event);
	},
	KeyIsDelete = function (event) {
		return ((event.keyName == 'Backspace') || (event.keyName == 'Delete')) && ! (event.ctrlKey);
	},
	KeyIsLRArrow = function (event) {
		return ((event.keyName == 'Left') || (event.keyName == 'Right')) && ! (event.altKey || event.metaKey);
	},
	KeyIsTabEnterEscape = function (event) {
		return event.keyName == 'Tab' || event.keyName == 'Enter' || event.keyName == 'Escape';
	},
	NumericEditBlurHandler = function(event) {
		var val = parseFloat(this.text);
		if(isNaN (val)){
			try{
				event.preventDefault();
				switch (this.name) {
					case 'cols':
						this.text = cols;
						break;
					case 'offset':
						this.text = offset;
						break;
					case 'width':
						this.text = wDoc;
						break;
				}
			}catch(e){}
		}else {
			switch(this.name){
				case 'cols':
					this.text = val < 2 ? 2 : (val > 15 ? 15 : val);
					break;
				case 'offset':
					this.text = val < 5 ? 5 : (val > 20 ? 20 : val);
					break;
				case 'width':
					this.text = val < 480 ? 480: val;
					break;
			}
		}
	},
	gridDocument = function (w, c, o) {
		var columns = parseFloat(w/c),
			guid = documentBootstrap.guides;
		for(var i=0; i<c; i++){
			var y = i*columns,
				y1 = y+o,
				y2 = y1+(columns-o*2);
			
			guid.add (Direction.VERTICAL, y);
			guid.add (Direction.VERTICAL, y1);
			guid.add (Direction.VERTICAL, y2);
			
			if(i == c-1){
				guid.add (Direction.VERTICAL, w);
			}
			
		}
		documentBootstrap.activeLayer.name = "Bootstrap Twitter Grids";
	},
	main = function() {
		customBox.visible = false;
		listBox.add("item", "screen-lg ≥ 1200px", 0);
		listBox.add("item", "screen-md ≥ 992px", 1);
		listBox.add("item", "screen-sm ≥ 768px", 2);
		listBox.add("item", "screen-xs < 768px", 3);
		listBox.add("item", "На заданную ширину", 4);
		listBox.items[0].selected = true;
		listBox.onChange = listboxChangeHandle;
		eColumnText.addEventListener ('keydown', NumericEditKeyboardHandler);
		eOffsetText.addEventListener ('keydown', NumericEditKeyboardHandler);
		eWidthText.addEventListener ('keydown', NumericEditKeyboardHandler);
		eColumnText.onDeactivate = NumericEditBlurHandler;
		eOffsetText.onDeactivate = NumericEditBlurHandler;
		eWidthText.onDeactivate = NumericEditBlurHandler;
		buttonOk.onClick = buttonOkClickHandle;
		dlgBootstrap.show();
	};
main();
