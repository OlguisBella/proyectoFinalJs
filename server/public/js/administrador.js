$(document).ready(function () {
    var data = {
        "nombre": "conejo",
        "url": "otra url"
    };

    //NUEVO AVATAR
    $("#btnNuevoAvatar").click(function () {
        contruirForm("avatar", "nuevo", "");
    });

    //NUEVA CARTA
    $("#btnNuevaCarta").click(function () {
        contruirForm("carta", "nuevo", "");
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
            construirLista(data, "carta");
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
            construirLista(data, "avatar");
        }
    });
});

//Crea Formulario para guardar y editar avatar y carta
function contruirForm(tipo, accion, id) {
    var url_peticion = "";
    var nombre_tipo = "";
    var titulo;
    switch (tipo) {
        case "avatar":
            nombre_tipo = "Avatar";
            titulo = "Crear Nuevo Avatar";
            if(accion == "nuevo") url_peticion = "/api/avatars";
            if(accion == "editar") {
                url_peticion = "/api/avatar/" + id + "?_method=PUT";
                titulo = "Editar Nuevo Avatar";
            }
            break;
        case "carta":
            nombre_tipo = "Carta";
            titulo = "Crear Nueva Carta";
            if(accion == "nuevo") url_peticion = "/api/cartas";
            if(accion == "editar") {
                url_peticion = "/api/carta/" + id + "?_method=PUT";
                titulo = "Editar Nueva Carta";
            }
            break;
        default:
            // code block
    }

    $("#divform").empty();

    $("#divform").append("<h2>" + titulo + "</h2>");

    var form = $("<form></form>")
        .attr("action", url_peticion)
        .attr("enctype", "multipart/form-data")
        .attr("method", "POST");

    var labelNombre = $("<label></label>")
        .attr("for", "fname")
        .text("Nombre:");
    var inputNombre = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "nombre")
        .attr("placeholder", "Nombre de " + nombre_tipo + "...");

    var labelImagen = $("<label></label>")
        .attr("for", "lname")
        .text("Imagen:");
    var inputImagen = $("<input></input>")
        .attr("type", "file")
        .attr("id", "fname")
        .attr("name", "url")
        .attr("placeholder", "Imagen de " + nombre_tipo + "...");

    var submit = $("<input></input>")
        .attr("type", "submit")
        .attr("value", "Guardar");

    form.append(labelNombre);
    form.append(inputNombre);
    form.append(labelImagen);
    form.append(inputImagen);
    form.append(submit);
    $('#divform').append(form);
}

//Crea la lista de avatar y cartas al cargar json, al inicio
function construirLista(data, tipo) {
    var url_peticion = "";
    var nombre_tipo = "";
    switch (tipo) {
        case "avatar":
            url_peticion = "/api/avatar/";
            nombre_tipo = "Avatar";
            break;
        case "carta":
            url_peticion = "/api/carta/";
            nombre_tipo = "Carta";
            break;
        default:
            // code block
    }
    data.forEach(element => {
        //var nombreActual = element.nombre;
        //var idActual = element.id;

        var p = $("<p></p>")
            .hide()
            .text(element.id);

        var div = $("<div></div>");

        var imgCarta = $("<img></img>")
            .attr("src", element.url)
            .addClass("img-fluid");
        var aCarta = $("<a></a>")
            .attr("href", "#");

        var imgEdit = $("<img></img>")
            .attr("src", "./images/BOTONES/EDITAR.png")
            .attr("id", "btnEdit" + nombre_tipo + element.nombre + element.id)
            .attr("data-value", element.id)
            .addClass("img-fluid");
        var aEdit = $("<a></a>")
            .attr("href", "#divform");

        var imgDel = $("<img></img>")
            .attr("src", "./images/BOTONES/ELIMINAR.png")
            .attr("id", "btnDel" + nombre_tipo + element.nombre + element.id)
            .attr("data-value", element.id)
            .addClass("img-fluid");
        var aDel = $("<a></a>")
            .attr("href", "#");

        imgCarta.appendTo(aCarta);
        aCarta.appendTo(div);
        imgEdit.appendTo(aEdit);
        aEdit.appendTo(div);
        imgDel.appendTo(aDel);
        aDel.appendTo(div);
        $('#lista' + nombre_tipo).append(div);
        $('#lista' + nombre_tipo).append(p);

        //ELIMINAR
        $("#btnDel" + nombre_tipo + element.nombre + element.id).on('click', function (e) {
            var id = $(this).data("value");
            $.ajax({
                url: url_peticion + id,
                type: 'DELETE',
                success: function(result) {
                    location.reload();
                }
            });
            location.reload();
        });   

        //EDITAR
        $("#btnEdit" + nombre_tipo + element.nombre + element.id).on('click', function (e) {
            var id = $(this).data("value");
            contruirForm(tipo, "editar", id)
        });   

    });
}