<?php 
$os=$_SERVER['HTTP_USER_AGENT'];
/*$yolVarMi=false;
$filePath = (stristr($os,"Windows")) ? "C:\User\DDoB\\" : "/opt/sinapsME/DDoB/";

if(stristr( $os,"Windows")) 
{
	$yolVarMi=is_dir("C:\User\DDoB");
}
else
{
	$yolVarMi=is_dir("/opt/DDoB/");
}

echo $yolVarMi ? 'true' : 'false';

if ($yolVarMi){ //is_dir() fonksiyonu ile belirtilenin klasör olup olmadığı kontrol ediliyor. 
// if içinde yazılmasının nedeni ise eğer bu bir klasör ise yapılacak şeylerin olmasıdır.
	$dosya = '/opt/DDoB/catalog.json';
	if (file_exists($dosya)) 
	{
		echo "$dosya diye bir dosya var";
	    $sonuc = fopen($filePath.'/catalog.json','w');
 		//$yazdır= fputs($olustur,"[]");
		if ($sonuc)
		{
			echo 'Klasör başarıyla oluşturuldu';
		}
		else{
			echo 'Bir hata oluştu';
		}
	} 
	else {
	    echo "$dosya diye bir dosya yok";
	}
}
else {
	$olustur = mkdir($filePath);
	echo "mkdir";
}
*/

$filePath = (stristr($os,"Windows")) ? "C:\User\DDoB\\" : "/opt/DDoB/";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

	$posts = json_decode(trim(file_get_contents('php://input')), true);	
	
	$catalog = fopen($filePath.'catalog.json', 'w') or die("Unable to open Catalog!"); // Dosya yoksa oluşturur
	fwrite($catalog, json_encode($posts["catalogData"])); // İçeriği dosyaya yazar
	fclose($catalog);

	if($posts["fileData"]!=""){
		$file = fopen($filePath.$posts["fileData"]["filename"].'.json', 'w') or die("Unable to open file!"); // Dosya yoksa oluşturur
		fwrite($file, json_encode($posts["fileData"])); // İçeriği dosyaya yazar
		fclose($file);
	}

}
if ($_SERVER['REQUEST_METHOD'] == "GET") {

	$file = $_GET['file'];
	$dir = $filePath; //dosyalarin kaydedileceği klasor yolu
	$file_out = $dir.$file.'.json'; // The image to return
	echo file_get_contents($file_out, FILE_USE_INCLUDE_PATH); // Dosyanın tamamını okumak için en uygun yöntem bu. değilse fread falan kullanılacak.

}
if ($_SERVER['REQUEST_METHOD'] == "PUT") {
	$posts = json_decode(trim(file_get_contents('php://input')), true);	
	$fpOld = file_get_contents($filePath.$posts["date"].'.json', FILE_USE_INCLUDE_PATH); 
	
	$fp = fopen($filePath.date('Y-m-d').'.json', 'w') or die("Unable to open file!"); // Dosya yoksa oluşturur
	fwrite($fp, $fpOld); // İçeriği dosyaya yazar
	fclose($fp);
	echo "Aktarma Başarılı";
}
if ($_SERVER['REQUEST_METHOD'] == "DELETE") {

	$filename = json_decode(trim(file_get_contents('php://input')), true)["filename"];
	echo($dir.$filename."json");
	$dir = $filePath; //dosyalarin kaydedileceği klasor yolu
	if (!unlink($dir.$filename.".json")) { 
	    echo ($dir.$filename.".json"." cannot be deleted due to an error"); 
	} 
	else { 
	    echo ("$filename has been deleted"); 
	} 

}

?> 