/*
$("button").click(function(){
  $.getJSON("demo_ajax_json.js", function(result){
    $.each(result, function(i, field){
      $("div").append(field + " ");
    });
  });
});
*/
$(document).ready(function () {
    var data = {
        "nombre": "conejo",
        "url": "otra url"
    };
    $("#btn1").click(function () {
        $("p").append(" <b>Appended text</b>.");
    });

    $.ajax({
        type: 'GET',
        url: "/api/cartas",
        data: data,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
            data.forEach(element => {
                console.log(element);
                var div = $("<div></div>");

                var imgCarta = $("<img></img>")
                    .attr("src", element.url)
                    .addClass("img-fluid");
                var aCarta = $("<a></a>")
                    .attr("href", "#");

                var imgEdit = $("<img></img>")
                    .attr("src", "./images/BOTONES/EDITAR.png")
                    .addClass("img-fluid");
                var aEdit = $("<a></a>")
                    .attr("href", "#");

                var imgDel = $("<img></img>")
                    .attr("src", "./images/BOTONES/ELIMINAR.png")
                    .addClass("img-fluid");
                var aDel = $("<a></a>")
                    .attr("href", "#");



                imgCarta.appendTo(aCarta);
                aCarta.appendTo(div);
                imgEdit.appendTo(aEdit);
                aEdit.appendTo(div);
                imgDel.appendTo(aDel);
                aDel.appendTo(div);
                $('#lista_cartas').append(div);
            });

        }
    });

    $.ajax({
        type: 'GET',
        url: "/api/avatars",
        data: data,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            //Do stuff with the JSON data
            data.forEach(element => {
                console.log(element);
                var div = $("<div></div>");

                var imgCarta = $("<img></img>")
                    .attr("src", element.url)
                    .addClass("img-fluid");
                var aCarta = $("<a></a>")
                    .attr("href", "#");

                var imgEdit = $("<img></img>")
                    .attr("src", "./images/BOTONES/EDITAR.png")
                    .addClass("img-fluid");
                var aEdit = $("<a></a>")
                    .attr("href", "#");

                var imgDel = $("<img></img>")
                    .attr("src", "./images/BOTONES/ELIMINAR.png")
                    .addClass("img-fluid");
                var aDel = $("<a></a>")
                    .attr("href", "#");



                imgCarta.appendTo(aCarta);
                aCarta.appendTo(div);
                imgEdit.appendTo(aEdit);
                aEdit.appendTo(div);
                imgDel.appendTo(aDel);
                aDel.appendTo(div);
                $('#lista_avtars').append(div);
            });

        }
    });
});
