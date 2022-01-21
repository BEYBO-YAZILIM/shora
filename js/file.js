let FILES;
let FILE_CATALOG;
let DURUM;

let file = {
    saveData: () => {
        DURUM = 0;
        minify(); // dosya içeriğinin beautify özelliği geri alınır
        let filename = (($("#filename").val()).toUpperCase()).trim();
        for (let i = 0; i <= FILE_CATALOG.length; i++) {
            if (filename == FILE_CATALOG[i]) {
                DURUM = 1;
            }
        }
        if (!!filename) {
            //$("#filename").setAttribute("disabled", "");
            let fileData = { filename: filename, file: $("#file").val() };
            let index = FILE_CATALOG.findIndex(e => e == filename);
            let isOld = index != -1 ? true : false;
            isOld ? FILE_CATALOG[index] = fileData : FILE_CATALOG.push(filename);
            if (DURUM == 0) {
                $.ajax({
                        url: 'file-api.php',
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            fileData: fileData,
                            catalogData: FILE_CATALOG,
                        })
                    })
                    .done(function() {
                        updateSlides(filename, isOld);
                        console.log("success");
                    })
                    .fail(function() {
                        alert("HATA OLUŞTU!")
                        console.log("error");
                    })
                    .always(function() {
                        console.log("complete");
                    });
            } else {
                alert("Bu isimle başka kayıt var!");
            }
        } else {
            uyari();
        }

    },
    saveOnlyCatalogData: () => {
        $.ajax({
                url: 'file-api.php',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    fileData: "",
                    catalogData: FILE_CATALOG,
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
        var agree = confirm("Bu içeriği silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz!");
        if (agree) {
            $.ajax({
                    url: 'file-api.php',
                    type: 'DELETE',
                    data: JSON.stringify({
                        filename: filename
                    })
                })
                .done(function(data) {
                    let index = FILE_CATALOG.findIndex(e => e.filename == filename);
                    FILE_CATALOG.splice(index, 1);
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
            document.getElementById("filename").value = "";
            document.getElementsByClassName("trumbowyg-editor")[0].innerHTML = "";
        } else { return false; }

    },

    getCatalogData: (ilkMi = false) => {
        $.ajax({
                url: 'file-api.php?file=catalog',
                type: 'GET'
            })
            .done(function(data) {
                FILE_CATALOG = JSON.parse(data);
                for (fileInCatalog of FILE_CATALOG) {
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
                $("#file").trumbowyg('html', data.file);
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
        ['foreColor', 'backColor'],
        ['code'],
        ['fullscreen']
    ]
});

FILE_CATALOG = file.getCatalogData();


function generateSlide(data) {
    return '<li class="slide leaderboard__profile" onclick="file.getFileData($(this))"><div class="metin_genislik">' + data +
        '</div><span class="btn-delete" onclick="file.deleteFile($(this))">X</span></li>';
}

function updateSlides(filename, isOld) {
    //let isOld = index != -1 ? true : false;
    if (!isOld)
        $('#slides').append(generateSlide(filename));
}

function closeEditorWarning() {
    return 'Sayfadan ayrılırsanız bilgileriniz kaydedilmeyecektir'
}

window.onbeforeunload = closeEditorWarning;

$(".trumbowyg-viewHTML-button").click(function(event) {
    beautify();
});

function uyari() {
    $("#filename").addClass("uyari-border");
}

function uyariKaldir() {
    $("#filename").removeClass("uyari-border");
}
