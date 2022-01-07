let FILES;
let FILE_CATALOG;

let file = {
	saveData: () => {
		minify(); // dosya içeriğinin beautify özelliği geri alınır
		let filename = $("#filename").val();
		let fileData ={filename:filename,file:$("#file").val()};
		let index = FILE_CATALOG.findIndex(e=>e.filename==filename);
		let isOld = index!=-1?true:false;
		isOld?FILE_CATALOG[FILE_CATALOG.findIndex(e=>e.filename==filename)] = fileData:FILE_CATALOG.push(fileData);
		$.ajax({
				url: 'file-api.php',
				type: 'POST',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					fileData:fileData,
					catalogData:FILE_CATALOG,
				})
			})
			.done(function() {
				updateSlides(fileData, index);
				console.log("success");
			})
			.fail(function() {
				alert("HATA OLUŞTU!")
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	},
	saveOnlyCatalogData: () => {
		$.ajax({
				url: 'file-api.php',
				type: 'POST',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					fileData:"",
					catalogData:FILE_CATALOG,
				})
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				alert("HATA OLUŞTU!")
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	},

	deleteFile: ($arg) => {
		event.stopPropagation();
		let filename = $arg.siblings("div").text();
		$.ajax({
				url: 'file-api.php',
				type: 'DELETE',
				data: JSON.stringify({
					filename: filename
				})
			})
			.done(function(data) {
				let index = FILE_CATALOG.findIndex(e=>e.filename==filename);
				FILE_CATALOG.splice(index,1);
				$arg.parents(".slide").remove();

				file.saveOnlyCatalogData(filename);
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	},

	getCatalogData: (ilkMi = false) => {
		$.ajax({
				url: 'file-api.php?file=catalog',
				type: 'GET'
			})
			.done(function(data) {
				FILE_CATALOG = JSON.parse(data);
				for(fileInCatalog of FILE_CATALOG){
					$('#slides').append(generateSlide(fileInCatalog));
				}
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	},

	getFileData: ($elm) => {
		$.ajax({
				url: 'file-api.php?file=' + $elm.find("div").text(),
				type: 'GET'
			})
			.done(function(json) { // {filename:"",file:""}
				let data = JSON.parse(json);
				$("#filename").val(data.filename);
				$("#file").trumbowyg('html',data.file);
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});

	}
}

function stop() {
	event.stopPropagation();
}

$.trumbowyg.svgPath = 'img/icons.svg';
formReset();
$('.trumbowyg').trumbowyg({
	lang: 'tr',
	/*btns: [
		['undo', 'redo'], // Only supported in Blink browsers
		['formatting'],
		['strong', 'em', 'del'],
		['superscript', 'subscript'],
		['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
		['unorderedList', 'orderedList'],
		['horizontalRule'],
		['removeformat'],
		['fullscreen'],
		['foreColor', 'backColor']
	]*/
	    btns: [
        ['viewHTML'],
        ['undo', 'redo'], // Only supported in Blink browsers
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['insertImage'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen']
    ]
});

FILE_CATALOG = file.getCatalogData();


function generateSlide(data) {
	return '<li class="slide leaderboard__profile" onclick="file.getFileData($(this))"><div>' + data.filename +
		'</div><span class="btn-delete" onclick="file.deleteFile($(this))">X</span></li>';
}

function updateSlides(fileData, index) {
	let isOld = index!=-1?true:false;
	if(!isOld)
		$('#slides').append(generateSlide(fileData));
}