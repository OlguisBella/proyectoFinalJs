var imgAvatar;
var baraja = [];
var animalitos;
var lvlActual = 1;
var puntaje = 0;


var ImgSource = [];
var ImgSource2 = [];
var ImgSource3 = [];
var avatars = [];
var idAvatar;


$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: "/api/cartas",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            animalitos = data;
            animalitos.sort(function (a, b) {
                return 0.5 - Math.random()
            });
            for (let i = 0; i < 2; i++) ImgSource.push(animalitos[i].url);
            for (let i = 0; i < 3; i++) ImgSource2.push(animalitos[i].url);
            for (let i = 0; i < 4; i++) ImgSource3.push(animalitos[i].url);

        }
    });

    $.ajax({
        type: 'GET',
        url: "/api/avatars",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            avatars = data;
            construirAvatars();
        }
    });

    var au = $('<audio id="audi" src="audio/intro.mp3" autoplay type="audio/mpeg" loop="true"></audio>');
    $("body").append(au);
    $("#btnIniciar").click(function () {
        aparecerPopup();
        $("#seccionIntro").fadeOut();
        $("#seccionAvatar").fadeIn();
    });

    $(".avatar").each(function (index) {

        $(this).on("click", function () {
            idAvatar = index;
            $("#imgN1").fadeIn();


            var fullp = $(this).prop('src');
            var filename = fullp.replace(/^.*[\\\/]/, '');
            var imgCreada = $("<img id='imgTm' class='avatarSeleccionado center-block img-responsive' src='images/AVATAR/" + filename + "' alt='new'>");
            imgAvatar = imgCreada;
            $("#seccionAvatar").append(imgCreada);

            $(".avatar").each(function (index) {
                $(this).css("display", "none");
            });

            var cronometro = $('<div class="img-responsive"><p id="cronometro"><span id="minutes">00</span>:<span id="seconds">00</span></p></div>');
            $("#seccionAvatar").append(cronometro);

            autoplay();
            $("#cronometro").fadeIn();
            $(".tituloAvatar").fadeOut();
            $("#picbox").fadeIn();
            var au = $('<audio src="audio/imgiguales.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
            crearTablero(1, 1);

        });
    });



});

function construirAvatars() {
    avatars.forEach(element => {
        var div = $("<div></div>")
            .attr("class", "col-md-12 col-sm-12");
        var img = $("<img></img>")
            .attr("src", element.url)
            .attr("class", "img-responsive avatar");
        var a = $("<a></a>")
            .attr("href", "#");

        a.append(img);
        div.append(a);
        $('#lista_avatar').append(div);
    });
}

function aparecerPopup() {
    var mpopup = $('#mpopupBox'); //Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show(); //Muestra el pop up
    $(".close").on('click', function () { //Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        var au = $('<audio src="audio/avatar.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);
    });
    $(window).on('click', function (e) { //Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) { //Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide(); //Se esconde el pop up
            var au = $('<audio src="audio/avatar.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
        }
    });


}

function aparecerPopupWinner() {
    //Guardar puntaje
    var dataJugador = {puntaje: puntaje, avatarId: avatars[idAvatar].id};
    /*$.ajax({
        url: '/api/jugadores',
        method: 'post',
        data: {
            puntaje: puntaje,
            avatarId: idAvatar
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
        },
    });*/

    $.post('/api/jugadores', dataJugador,
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
        });

    var au = $('<audio src="audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);
    $('#conPuntaje').html("Has recopilado " + puntaje + " puntos")
    var mpopup = $('#popwinner'); //Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show(); //Muestra el pop up
    $(".close").on('click', function () { //Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        location.reload();

    });

    $(window).on('click', function (e) { //Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) { //Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide(); //Se esconde el pop up
            location.reload();
            var au = $('<audio src="audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);

        }
    });


}


var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;

var Source = "#boxcard";



function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ShuffleImages() {
    var ImgAll = $(Source).children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
    }

    ImgThis = $(Source + " div:first-child");

    for (var z = 0; z < ImgAll.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
}

function ResetGame() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}

function OpenCard() {
    var id = $(this).attr("id");
    var au = $('<audio src="audio/cartas.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);

    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);

        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == "") {
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                    var au = $('<audio src="audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>');
                    $("body").append(au);
                }, 400);
            } else {
                puntaje += 10;
                $("#" + id + " img").parent().css("visibility", "show");
                $("#" + BoxOpened + " img").parent().css("visibility", "show");
                ImgFound++;
                BoxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function () {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }
        Counter++;
        $("#counter").html("" + Counter);

        if (lvlActual == 1) {
            if (ImgFound == 2) {
                $("#imgN1").fadeOut();
                $("#imgN2").fadeIn();
                lvlActual++;
                $("#counter").prepend('<span id="success">Felicidades </span>');
                var au = $('<audio src="audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
                setTimeout(function () {
                    crearSecLvl();


                }, 4000);

                ImgFound = 0;
                $("#boxcard div").css("width", "160px");
                $("#boxcard div").css("height", "160px");
            }
        } else if (lvlActual == 2) {
            if (ImgFound == 3) {
                $("#imgN2").fadeOut();
                $("#imgN3").fadeIn();
                lvlActual++;
                $("#counter").prepend('<span id="success">Felicidades </span>');
                var au = $('<audio src="audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
                setTimeout(function () {
                    crearTerLvl();


                }, 4000);


            }
        } else if (lvlActual == 3) {
            if (ImgFound == 4) {
                aparecerPopupWinner();
            }
        }
    }
}

$(function () {
    for (var y = 0; y < 2; y++) {
        var contador = 0;
        $.each(ImgSource, function (i, val) {
            $(Source).append("<div class='col-sm-6' id=card" + y + i + "><img class='CorrSide' src=" + val + " />");
            contador++;
        });
    }
    $(Source + " div").click(OpenCard);
    ShuffleImages();

});

function crearSecLvl() {
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    Counter = 0;
    $("#boxcard").empty();
    $(function () {
        for (var y = 0; y < 2; y++) {
            //var contador=0;
            can = ImgSource2.length;
            $.each(ImgSource2, function (i, val) {
                $(Source).append("<div id=card" + y + i + "><img class='CorrSide' src=" + val + " />");
                // contador++;         
            });
        }
        $(Source + " div").click(OpenCard);
        ShuffleImages();
    });
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    $("#success").remove();
    $("#counter").html("" + Counter);
    $("#puntaje").html("" + puntaje);
}

function crearTerLvl() {
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    Counter = 0;
    $("#boxcard").empty();
    $(function () {
        for (var y = 0; y < 2; y++) {
            var contador = 0;
            can = ImgSource3.length;
            $.each(ImgSource3, function (i, val) {
                $(Source).append("<div id=card" + y + i + "><img class='CorrSide' src=" + val + " />");
                contador++;
            });
        }
        $(Source + " div").click(OpenCard);
        ShuffleImages();
    });
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    $("#success").remove();
    $("#counter").html("" + Counter);
    $("#puntaje").html("" + puntaje);
}