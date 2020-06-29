function cargarDatosPedido(data) {
    var html = '';
    var total=0;
    var count = 1;
    $.each(data, function (i, item) {

       total = total + item.price_total;     
       html +='<tr><th scope="row">'+ count + '</th>';
       html +='<td>' + item.name + '</td>'
       html +='<td>' + item.description + '</td>'
       html +='<td>' + item.price + '</td>'
       html +='<td>' + item.cantidad +'</td>'
       html +='<td>' + item.price_total + '</td>'
       html +='<td><center><a onClick="QuitarItem('+ "'" + item.id + "'" + ' )"  class="btn btn-danger fa fa-minus"></a></center></td>';                          
       html +='<td><center><a onClick="AgregarItem('+ "'" + item.id + "'" + ' )" class="btn btn-success fa fa-plus"></a></center></td></tr>';      
       count=count+1;
    });
    $('#carrito tbody').html(html);
    ObtenerImporteTotal(total); 
}

function ObtenerImporteTotal(ImporteTotal) {
    var html = '';
    html +='<tr><td colspan=5><center>Total S/.</center></td>';
    html +='<td>'+ImporteTotal+'.00</td></tr>'    
    $('#carrito tfoot').html(html);    
}


function AgregarItem(id) {
    url='/kiddle/list-solicitudes/Pedidos' + '/agregar/'+ id;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrarDatos(data);
            cargarDatosPedido(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}


function QuitarItem(id) {
    url= '/kiddle/list-solicitudes/Pedidos' + '/quitar/'+ id;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrarDatos(data);
            cargarDatosPedido(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
    return false;
}


function mostrarDatos(data) {
    var cantidad = 0;
    $.each(data, function (i, item) {
        cantidad += item.cantidad;
    });
    $('#cant').html(cantidad);
}

function refrescar() {
    var url = '/kiddle/listarKiddle';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            mostrarDatos(data);
            cargarDatosPedido(data);
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}
$().ready(function () {
    refrescar();
});  