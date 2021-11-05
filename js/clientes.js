'use strict'
function consultar(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTabla').empty();
            $.each(data, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idClient+'</td>'+
                        '<td>'+value.email+'</td>'+
                        '<td>'+value.password+'</td>'+
                        '<td>'+value.name+'</td>'+
                        '<td>'+value.age+'</td>'+
                        '<td>'+value.reservations.idReservation+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.idReservation+')">Editar</button>'+
                            '<button type="button" class="btn btn-danger" onclick="eliminar('+value.idReservation+')">Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

'use strict'
function consultarMensajes(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Messages/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTablaMensajes').empty();
            $.each(data, function(index, value){
                $('#cuerpoTablaMensajes').append(
                    '<tr>'+
                        '<td>'+value.id+'</td>'+
                        '<td>'+value.messageText+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.idReservation+')">Editar</button>'+
                            '<button type="button" class="btn btn-danger" onclick="eliminar('+value.idReservation+')">Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarReservas(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTablaReservas').empty();
            $.each(data, function(index, value){
                $('#cuerpoTablaReservas').append(
                    '<tr>'+
                        '<td>'+value.idReservation+'</td>'+
                        '<td>'+value.startDate+'</td>'+
                        '<td>'+value.devolutionDate+'</td>'+
                        '<td>'+value.machine.name+'</td>'+
                        '<td>'+value.client.name+'</td>'+
                        '<td>'+value.score+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn btn-info" onclick="editar('+value.idReservation+')">Editar</button>'+
                            '<button type="button" class="btn btn-danger" onclick="eliminar('+value.idReservation+')">Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}


$("#btnAgregarCliente").click(function(){
    //http://'+window.location.host+'/api/Machine/add
    if($('#name').val() == "" || $('#email').val() == "" || $('#age').val() == "" ){
        alert("Todos los campos son obligatorios, excepto el ID");
    }else{
        var startDate = $('#startDate').val();
        var devolutionDate = $('#devolutionDate').val();
        var machine = $('#machine').val();
        var client = $('#client').val();
        var score = $('#score').val();
        var data = {
            startDate: startDate,
            devolutionDate: devolutionDate,
            machine:{
                id: machine
            },
            client: {
                idClient:client
            },
            score: score
        };
        $.ajax({
            url: 'http://129.151.99.73:8080/api/Reservation/save',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: {
                201: function(data){
                    $('#startDate').val('');
                    $('#devolutionDate').val('');
                    $('#machine').val(0);
                    $('#client').val(0);
                    $('#score').val(0);
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
    consultarMensajess();
    consultarReservas();
});
