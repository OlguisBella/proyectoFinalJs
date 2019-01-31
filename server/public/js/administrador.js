/*
$("button").click(function(){
  $.getJSON("demo_ajax_json.js", function(result){
    $.each(result, function(i, field){
      $("div").append(field + " ");
    });
  });
});
*/

var data = {
    "nombre": "conejo",
    "url": "otra url"
};

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
        console.log(data);
    }
});