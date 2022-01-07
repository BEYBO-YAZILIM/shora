<?php 
if ($_SERVER['REQUEST_METHOD'] == "POST") {

	$posts = json_decode(trim(file_get_contents('php://input')), true);	
	
	$catalog = fopen('/opt/sinapsME/catalog.json', 'w') or die("Unable to open Catalog!"); // Dosya yoksa oluşturur
	fwrite($catalog, json_encode($posts["catalogData"])); // İçeriği dosyaya yazar
	fclose($catalog);

	if($posts["fileData"]!=""){
		$file = fopen('/opt/sinapsME/'.$posts["fileData"]["filename"].'.json', 'w') or die("Unable to open file!"); // Dosya yoksa oluşturur
		fwrite($file, json_encode($posts["fileData"])); // İçeriği dosyaya yazar
		fclose($file);
	}

}
if ($_SERVER['REQUEST_METHOD'] == "GET") {

	$file = $_GET['file'];
	$dir = '/opt/sinapsME/'; //dosyalarin kaydedileceği klasor yolu
	$file_out = $dir.$file.'.json'; // The image to return
	echo file_get_contents($file_out, FILE_USE_INCLUDE_PATH); // Dosyanın tamamını okumak için en uygun yöntem bu. değilse fread falan kullanılacak.

}
if ($_SERVER['REQUEST_METHOD'] == "PUT") {
	$posts = json_decode(trim(file_get_contents('php://input')), true);	
	$fpOld = file_get_contents('/opt/sinapsME/'.$posts["date"].'.json', FILE_USE_INCLUDE_PATH); 
	
	$fp = fopen('/opt/sinapsME/'.date('Y-m-d').'.json', 'w') or die("Unable to open file!"); // Dosya yoksa oluşturur
	fwrite($fp, $fpOld); // İçeriği dosyaya yazar
	fclose($fp);
	echo "Aktarma Başarılı";
}
if ($_SERVER['REQUEST_METHOD'] == "DELETE") {

	$filename = json_decode(trim(file_get_contents('php://input')), true)["filename"];
	echo($dir.$filename."json");
	$dir = '/opt/sinapsME/'; //dosyalarin kaydedileceği klasor yolu
	if (!unlink($dir.$filename.".json")) { 
	    echo ($dir.$filename.".json"." cannot be deleted due to an error"); 
	} 
	else { 
	    echo ("$filename has been deleted"); 
	} 

}

?> 