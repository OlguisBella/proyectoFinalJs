var misdatos = [];

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "/api/jugadoresTop",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            misdatos = data;
            listado(data);
        }
    });

});


function listado(data) {
    data.forEach(element => {
        console.log(element);

        var h2 = $("<h2></h2>")
            .text(element.puntaje);

        var div = $("<div></div>")
        .attr("class", "col-md-12 col-sm-12");
        var divImg = $("<div></div>");
        var divtexto = $("<div></div>");

        var imgJugador = $("<img></img>")
            .attr("src", element.Avatar.url)
            .addClass("img-fluid");

        divImg.append(imgJugador);
        divtexto.append(h2);
        div.append(divImg);
        div.append(divtexto);
        $('#lista_jugadores').append(div);
    });
}