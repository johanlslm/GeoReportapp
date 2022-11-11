$(document).ready(function () {
    LoadingStar('Cargando información!!!')
    var theMarker = {};
    var latlng = [4.586606151447006, -74.2159938812256];
    var mymapGPS = L.map("ContReportGPSMap").setView(latlng, 13);


    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(mymapGPS);

    var greyIcon = new L.Icon({
        iconUrl: 'https://pngimg.com/uploads/gps/small/gps_PNG59.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [40, 45],
        iconAnchor: [20, 45],
        popupAnchor: [-2, -42],
        shadowSize: [41, 41]
    });

    var parametro = {};

    $.ajax({
        type: 'POST',
        url: '../Home/ConsultaReporteGeneral',
        data: JSON.stringify(parametro),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function (data) {
            LoadingStop();

            var html = '';
            var contador = 0;
            var backgrounbr = "";
            $.each(data.datosGPSR, function (index, item) {
                contador++;
                let bgtr = contador % 2;
                if (bgtr == 1) {
                    backgrounbr = "#ffffff";
                } else if (bgtr == 0) {
                    backgrounbr = "#c7c7c7";
                }

                let tipoHueco = "";
                switch (item.TipoH) {
                    case 1:
                        tipoHueco = "Hueco en la calle";
                        break;
                    case 2:
                        tipoHueco = "Alcantarilla sin tapa";
                        break;
                    case 3:
                        tipoHueco = "Hueco en puente";
                        break;
                    case 4:
                        tipoHueco = "Losa levantada";
                        break;
                }

                let EstadoHueco = "";
                switch (item.Estado) {
                    case 1:
                        EstadoHueco = "Reporte activo";
                        break;
                    case 2:
                        EstadoHueco = "Reporte inactivo";
                        break;
                }


                var greyIcon = new L.Icon({
                    iconUrl: 'https://pngimg.com/uploads/gps/small/gps_PNG59.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [40, 45],
                    iconAnchor: [20, 45],
                    popupAnchor: [-2, -42],
                    shadowSize: [41, 41]
                });
                theMarker = L.marker([item.Latitud, item.Longitud], { icon: greyIcon }).addTo(mymapGPS).bindPopup('<div class="ContImgPop1"><img src="../Img/ReporteHuecos/' + item.Url_Img +'" alt=""></div>' +
                    '<div class="ContTxtPop1">' +
                    '<Span>Id Registro: </Span> ' + item.Id_Reporte + ' <br>' +
                    '<Span>Fecha Registro: </Span> ' + item.FechaRegistro +' <br>' +
                    '<Span>Tipo de hueco: </Span> ' + item.tipoHueco +' <br>' +
                    '<Span>Direccion: </Span> ' + item.Direccion + '<br>' +
                    '<Span>Coordenadas: </Span> ' + item.Latitud + ' , ' + item.Longitud + ' <br>' +
                    '<Span><i class="fa-solid fa-thumbs-up"></i></Span> ' + item.Like +' <br>' +
                    '<Span> <i class="fa-solid fa-thumbs-down"></i> </Span> ' + item.DisLike +'<br>' +
                    '<Span>Descripción: </Span> ' + item.Descripcion + '<br>' +
                    '</div>');

                html += '<tr style="background:' + backgrounbr + '; text-aling: left">' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Id_Reporte + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.FechaRegistro + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Direccion + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Latitud + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Longitud + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Latitud + ' , ' + item.Longitud + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.tipoHueco + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.EstadoHueco + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Like + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.DisLike + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver">' + item.Descripcion + '</td>' +
                    '<td class="tdinfo" style="text-align: left; border: 1 px solid silver"> www.direccionRepositorio/Img/Media/accesoReporte/' +item.Url_Img + '</td>' +
                    '<tr>';

            });
            $('#TbInfoReport').html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            LoadingStop();
            var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
            EventoModalNotification(RespEvent);
        }
    });

    function EventoModalNotification(TipoModal) {
        let DTOInfoModalNot;
        switch (TipoModal.TipoRespuesta) {
            case 1:
                DTOInfoModalNot = { Color: "Naranja", Icono: "Alerta", TxtInfo: TipoModal.TextInfo };
                break;
            case 2:
                DTOInfoModalNot = { Color: "Naranja", Icono: "Password", TxtInfo: TipoModal.TextInfo };
                break;
            case 3:
                DTOInfoModalNot = { Color: "Azul", Icono: "Usuario", TxtInfo: TipoModal.TextInfo };
                break;
            case 4:
                DTOInfoModalNot = { Color: "Rojo", Icono: "Fallo", TxtInfo: TipoModal.TextInfo };
                break;
        }
        OpenAlertInfo(DTOInfoModalNot, TipoModal.Confirmar);

    }
});


var TableToExcel = (function () {

    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/tr/rec-html40"><head><meta charset = "utf-8"><style>.fghfh {background: #D8FFBC}</style><!--[if gte mso 9]><xml><x:excelworkbook><x:excelworksheets><x:excelworksheet><x:name>{worksheet}</x:name><x:worksheetoptions><x:displaygridlines/></x:worksheetoptions></x:excelworksheet></x:excelworksheets></x:excelworkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        var downloadName = "ReporteGeneralGeoReportApp";
        if (downloadName != null) {
            var link = document.createElement("a");
            link.download = downloadName + ".xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
        }
    }
})()