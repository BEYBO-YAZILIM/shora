function bugun(ayrac, tersMi) {
	var simdi = new Date();
	return tarihFormatla(simdi, ayrac, tersMi);
}

function tarihFormatla(tarih, ayrac, tersMi) {
	if (tersMi)
		return tarih.getFullYear() + ayrac + sifirEkleme(tarih.getMonth() + 1) + ayrac + sifirEkleme(tarih.getDate());
	else
		return sifirEkleme(tarih.getDate()) + ayrac + sifirEkleme(tarih.getMonth() + 1) + ayrac + tarih.getFullYear();
}

function sifirEkleme(n) {
	return n > 9 ? "" + n : "0" + n;
}

function urlSorguParametresi(path, param) {
  const url = new URL(path);
  return url.searchParams.get(param); // => 'hello'
}

function formReset() {
	$('.trumbowyg').val('');
	$('#filename').val('');
	$('.jscolor').val('F0F8FF');
	$('.jscolor').css({
		"background-color": "#F0F8FF",
		"color": "rgb(0, 0, 0)"
	});
	$('#file').trumbowyg('empty');
	$('#image_text_editor').trumbowyg('empty');
	$('#image_uploader #video_explaination').val('');
	changeLabel($('#image_uploader'), 'Dosya Seçiniz', "");
}

function changeLabel(fileInput, label, labelClass) {
	fileInput.siblings('label').text(label);
	fileInput.siblings('label').removeClass().addClass('custom-file-label ' + labelClass);
}
function uploadSetter(uploadButton, type) { //dosya seçildiğinde
	var id = uploadButton.parents(".input-group").find('[type="file"]').attr('id');
	var uploadableFile = document.getElementById(id); //file_upload id li elemanı al, file input
	var fileName = uploadableFile.value.split("\\");
	fileName = fileName[fileName.length - 1];
	if (uploadableFile.files && uploadableFile.files[0]) { //dosya var ve resim türünde ise
		if (!uploadableFile.files[0].type.match(type + '.*')) {
			alert("Dosya Türü Yanlış!\nİstenen: " + type + ".*\nBulunan: " + uploadableFile.files[0].type);
			return;
		}
		var reader = new FileReader(); //FileReader class kur
		reader.onload = function(file) { //veriyi yükle
			if (type == "video") {
				setVideoDuration(file);
			}
			var fileData = reader.result; //dosya verisi

			upload(fileName, fileData).then((data) => {
				if (data == "success") {
					changeLabel($(uploadableFile), fileName, "bg-success");
					alert("Dosya başarıyla yüklendi");
				} else {
					changeLabel($(uploadableFile), "Bir Hata Meydana Geldi", "bg-danger");
					alert("Video/Resim: " + data); //hata mesajini goster
				}
			});
		}
		reader.readAsDataURL(uploadableFile.files[0]); //oku
	} else {
		alert('Yüklenecek Dosya Bulunamadı!')
	}
};

function upload(fileName, fileData) {
	return new Promise((resolve, reject) => {
		$.ajax({ //dosya data sını ajax.php ye postala
			url: "upload.php",
			type: "POST",
			data: {
				"dosyaAdi": fileName,
				"veri": fileData
			},
			dataType: "json",
			success: function(data) {
				resolve(data);
			}
		});
	});
}

function beautify() {
	$("#file").trumbowyg('html',html_beautify($("#file").val()));	
}

function minify() {
	$("#file").val($("#file").val().replace(/\r?\n|\r|\t|\s{2}/g, "").trim()); // Yeni satır, tab ve çoklu boşluklar silinir
}