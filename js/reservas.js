'use strict'
function consultar(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#cuerpoTabla').empty();
            $.each(data, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.idReservation+'</td>'+
                        '<td>'+value.startDate+'</td>'+
                        '<td>'+value.devolutionDate+'</td>'+
                        '<td>'+value.machine.name+'</td>'+
                        '<td>'+value.client.name+'</td>'+
                        '<td>'+value.score+'</td>'+
                        '<td>'+
                            '<button data-toggle="modal" data-target="#modalEditarReserva" id="btnEditarReserva" type="button" class="btn btn-info" onclick="editar('+value.idReservation+')">Editar</button>'+
                            ''+
                            '<button id="btnEliminarReserva" type="button" class="btn btn-danger" onclick="eliminar('+value.idReservation+')">Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function consultarMaquinas(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Machine/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#machine').append('<option value="0">Seleccione una maquina</option>');
            $.each(data, function(index, value){
                $('#machine').append(
                    '<option value="'+value.id+'">'+value.name+'</option>'
                );
            });
        }
    });
}

function consultarClientes(){
    $.ajax({
        url: 'http://129.151.99.73:8080/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#client').append('<option value="0">Seleccione un cliente</option>');
            $.each(data, function(index, value){
                $('#client').append(
                    '<option value="'+value.idClient+'">'+value.name+'</option>'
                );
            });
        }
    });
}

$("#btnAgregarReserva").click(function(){
    //http://'+window.location.host+'/api/Machine/add
    if($('#startDate').val() == "" || $('#devolutionDate').val() == "" || $('#machine').val() == "0" || $('#client').val() == "0" || $('#score').val() == ""){
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

$("#btnEditarReserva").click(function(){
    //http://'+window.location.host+'/api/Machine/add
    if($('#idReservation').val()==''){
        alert("El ID de la reserva es obligatorio");
    }else{
        var idReservation = $('#idReservation').val();
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
            url: 'http://129.151.99.73:8080/api/Reservation/update',
            type: 'PUT',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: {
                201: function(data){
                    $('#idReservation').val('');
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
    consultarClientes();
    consultarMaquinas();
});
