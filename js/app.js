'use strict'
function consultar(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Machine/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTabla').empty();
            $.each(data, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.id+'</td>'+
                        '<td>'+value.name+'</td>'+
                        '<td>'+value.brand+'</td>'+
                        '<td>'+value.year+'</td>'+
                        '<td>'+value.description+'</td>'+
                        '<td>'+value.category.name+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.id+')">Editar</button>'+
                            '<button type="button" class="btn btn-danger" onclick="eliminar('+value.id+')">Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarCatgorias(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Category/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#category').append('<option value="0">Seleccione una categoria</option>');
            $.each(data, function(index, value){
                $('#category').append(
                    '<option value="'+value.id+'">'+value.name+'</option>'
                );
            });
        }
    });
}

$("#btnAgregar").click(function(){
    //http://'+window.location.host+'/api/Machine/add
    if($('#name').val() == "" || $('#brand').val() == "" || $('#year').val() == "" || $('#description').val() == "" || $('#category').val() == "0"){
        alert("Todos los campos son obligatorios, excepto el ID");
    }else{
        var name = $('#name').val();
        var brand = $('#brand').val();
        var year = $('#year').val();
        var description = $('#description').val();
        var category = $('#category').val();
        var data = {
            name: name,
            brand: brand,
            year: year,
            description: description,
            category: {
                id: category
            }
        };
        $.ajax({
            url: 'http://129.151.99.73:8080/api/Machine/save',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: {
                201: function(data){
                    $('#name').val('');
                    $('#brand').val('');
                    $('#year').val('');
                    $('#description').val('');
                    $('#category').val(0);
                    consultar();
                },
                415: function(data){
                    alert("Error en los datos");
                }
            }
        });
    }
});


$(document).ready(function(){
    consultar();
    consultarCatgorias();
});
