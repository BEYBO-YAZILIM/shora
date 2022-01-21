<?php
session_start();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>SHORA</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
		<link href="css/all.css" rel="stylesheet" type="text/css"/>
		<link href="css/stil.css" rel="stylesheet" type="text/css"/>


		<link rel="stylesheet" href="css/reset.min.css">
		<link rel="stylesheet" href="css/trumbowyg.min.css">
		<link rel="stylesheet" href="css/trumbowyg.colors.min.css">
		<link rel="stylesheet" href="css/duyurular.css">
		<link rel="shortcut icon" type="image/png" href="img/sinapsDDoB.png" />
	</head>
	<body style="height: 100vh;">
		<h2 class="text-center" style="font-weight: bold; text-shadow: 0px 3px 10px #9dc2bc;">SHORA</h2>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-10" style="overflow: scroll;height: 100%;">
					<ul class="nav nav-tabs">
						<li class="nav-item">
							<a href="#text" class="nav-link active" data-toggle="tab"><i class="fas fa-paragraph" style="color: #2d7b70;"></i></a>
						</li>
						<li class="nav-item">
							<a href="#image" class="nav-link" data-toggle="tab"><i class="fas fa-image" style="color: #2d7b70;"></i></a>
						</li>
						<li class="nav-item">
							<a href="#video" class="nav-link" data-toggle="tab"><i class="fas fa-video" style="color: #2d7b70;"></i></a>
						</li>
						<li class="nav-item">
							<a href="#external" class="nav-link" data-toggle="tab"><i class="fab fa-youtube" style="color: #2d7b70;"></i></a>
						</li>

					</ul>
					<div class="tab-content">
						<div id="text" class="tab-pane fade show active">
							<div class="row mt-1 dosya_adi" style="align-items: center;">
								<span id="old"></span>
								<label for="text_duration" class="mt-2" style="color: #2d7b70;text-shadow: 0px 3px 10px #9dc2bc; padding-right: 20px;">Dosya Adı</label>
								<div style="padding-right: 20px;">
								<input type="text" id="filename" style="font-size: 1.2rem;" placeholder="Alanı Boş Bırakmayınız" onfocus="uyariKaldir()">
								<button onclick="file.saveData()" class="kaydet_buton">KAYDET</button>
							</div>
							</div>
								<div class="w-100" style="margin-bottom: -1.2rem;border: 0.5px solid #ccc; border-block-color: #9dc2bc;">
									<button style="background-color: #ecf0f1;" class="btn"><i class="fas fa-code"></i></button>
								</div>
							<textarea id="file" class="trumbowyg"></textarea>
						</div>
						
						<div id="image" class="tab-pane fade">
							<div class="row justify-content-around mt-1">
								<label for="image_duration" class="mt-2">Süre</label>
								<input type="number" id="image_duration" class="w-25 duration" value="10">
								<label for="image_bg" class="mt-2">Renk</label>
								<input type="text" id="image_bg" class="jscolor form-control w-25">
							</div>
							<div class="input-group m-1 pr-3">
								<div class="custom-file">
									<input type="file" class="custom-file-input" id="image_uploader" onchange="changeLabel($(this),'Dosyayı Yükleyiniz =>','bg-warning')" accept=".png, .jpeg, .gif, .jpg">
									<label class="custom-file-label" for="image_uploader">Dosya Seçin</label>
								</div>
								<div class="input-group-append">
									<button class="input-group-text" onclick="uploadSetter($(this), 'image')">Yükle</button>
								</div>
							</div>
							<textarea id="image_text_editor" class="trumbowyg"></textarea>
						</div>
						<div id="video" class="tab-pane fade">
							<div class="row justify-content-around mt-1">
								<label for="video_duration" class="mt-2">Süre</label>
								<input type="number" id="video_duration" class="w-25 duration" value="10">
								<label for="video_bg" class="mt-2">Renk</label>
								<input type="text" id="video_bg" class="jscolor form-control w-25">
							</div>
							<div class="input-group my-1">
								<div class="custom-file">
									<input type="file" class="custom-file-input" id="video_uploader" onchange="changeLabel($(this),'Dosyayı Yükleyiniz =>','bg-warning')" accept=".mp4">
									<label class="custom-file-label" for="video_uploader">Dosya Seçiniz</label>
								</div>
								<div class="input-group-append">
									<button class="input-group-text" onclick="uploadSetter($(this), 'video')">Yükle</button>
								</div>
							</div>
							<textarea id="video_explaination" class="form-control" style="width: 100%;" placeholder="Açıklama"></textarea>
							<canvas hidden id="video_thumbnail" style="width: 100%"></canvas>
							<img id="video_thumbnail_image" src="" alt="" class="w-100">
						</div>
						<div id="external" class="tab-pane fade">
							<div class="row justify-content-around mt-1">
								<label for="external_duration" class="mt-2">Süre</label>
								<input type="number" id="external_duration" class="w-25 duration" value="10">
								<label for="external_bg" class="mt-2">Renk</label>
								<input type="text" id="external_bg" class="jscolor form-control w-25">
							</div>
							<input type="url" id="external_link" class="form-control  my-1" placeholder="Bağlantı Adresi">
							<textarea id="external_explaination" class="form-control" style="width: 100%;" placeholder="Açıklama"></textarea>
							<img id="external_thumbnail_image" src="" alt="" class="w-100">
						</div>
					</div>
				</div>
				<div id="slides_container" class="col-lg-2 renk">
					<ul id="slides" class="slides leaderboard__profiles renk">
						
					</ul>
				</div>
			</div>
		</div>

		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js(Dropdownlar için), then Bootstrap JS -->
		<script src="js/jquery-3.4.0.min.js"></script>
		<script src="js/popper.min.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/trumbowyg.min.js"></script>
		<script src="js/trumbowyg.colors.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify-html.min.js"></script>
		<script type="text/javascript" src="js/tr.min.js"></script>
		<script src="js/jscolor.js"></script>
		<script src="js/util.js"></script>
		<script src="js/file.js"></script>
	</body>
</html>