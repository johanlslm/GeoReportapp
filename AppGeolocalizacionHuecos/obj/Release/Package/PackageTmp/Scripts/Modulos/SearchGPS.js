$(document).ready(function () {
    var theMarker = {};
    var LatMain;
    var LngMain;
    var theCircle = {};
    var theCircleRed = {};
    var latlng = [4.583868359826262, -74.2134189605713];
    var mymapGPS = L.map("mapcontainer").setView(latlng, 13);

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
    mymapGPS.on('dblclick', onMapClick);

    function onMapClick(e) {
        DrawMarker(e.latlng.lat, e.latlng.lng);
    }

    $('#btnGPSSearch1').click(function GenerarUbitacion() {
        if (!"geolocation" in navigator) {
            var RespEvent = { TipoRespuesta: 1, TextInfo: "El navegador no tiene habilitada la busqueda por GPS, intenta por busqueda manual" }
            EventoModalNotification(RespEvent);
        } else {
            let latitud;
            let longitud;
            function ubicacion(geolocationPosition) {
                latitud = geolocationPosition.coords.latitude;
                longitud = geolocationPosition.coords.longitude;
                DrawMarker(latitud, longitud);
            }
            const onErrorDeUbicacion = err => {
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error en el proceso de busqueda, intenta mas tarde!!!" }
                EventoModalNotification(RespEvent);
            }
            var opcionesDeSolicitud = {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            };
            navigator.geolocation.getCurrentPosition(ubicacion, onErrorDeUbicacion, opcionesDeSolicitud);
        }
    })

    $('#btnGPSSearch3').click(function GenerarUbitacion() {
        let inputDirSearch = document.getElementById('InputGPSSearch2');
        let dirInfoSearch = inputDirSearch.value;
        if (dirInfoSearch == null || dirInfoSearch == "") {
            var RespEvent = { TipoRespuesta: 1, TextInfo: "Debes completar los campos de busqueda!" }
            EventoModalNotification(RespEvent);
        } else {
            let txtDireccion = dirInfoSearch;
            let NombreCiudad = 'Soacha';
            let NombreDpto = 'Cundinamarca';
            var lati, longi;
            let geocoder = new google.maps.Geocoder();
            let inputAddress = txtDireccion + ' ' + NombreCiudad + ' ' + NombreDpto;
            geocoder.geocode({ "address": inputAddress }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lati = results[0].geometry.location.lat();
                    longi = results[0].geometry.location.lng();
                    DrawMarker(lati, longi);
                } else {
                    var RespEvent = { TipoRespuesta: 4, TextInfo: "Error en el proceso de busqueda, intenta mas tarde!!!" }
                    EventoModalNotification(RespEvent);
                }
            });
        }
    })

    $('#InputGPSSearch2').keypress(function (event) {
        if (event.keyCode === 13) {
            document.getElementById('btnGPSSearch3').click();
        }
    });

    $('#InputRangeSearch').change(function () {
        var txtRange = document.getElementById('InputRangeSearch').value;
        document.getElementById('InputRangeSearchTxt').value = txtRange + ' KM';
    })

    function DrawMarker(Lat, Long) {
        var RadioKm = document.getElementById('InputRangeSearch').value;
        var RadioMap = RadioKm * 1000;
        var Zoomval = 18
        LatMain = Lat;
        LngMain = Long;

        if (RadioKm > 6) { Zoomval = 12 }
        if (RadioKm > 4 && RadioKm <= 46) {Zoomval = 13}
        if (RadioKm > 3 && RadioKm <= 4) { Zoomval = 13 }
        if (RadioKm > 2 && RadioKm <= 3) { Zoomval = 14 }
        if (RadioKm > 1 && RadioKm <= 2) { Zoomval = 15 }
        if (RadioKm <= 1 ) { Zoomval = 16 }


        var greyIcon = new L.Icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/1062/1062187.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [50, 55],
            iconAnchor: [25, 55],
            popupAnchor: [-2, -42],
            shadowSize: [41, 41]
        });

        if (theMarker != undefined) {
            mymapGPS.removeLayer(theMarker);
        };

        if (theCircle!= undefined) {
            mymapGPS.removeLayer(theCircle);
        };

        if (theCircleRed != undefined) {
            mymapGPS.removeLayer(theCircleRed);
        };

        theMarker = L.marker([Lat, Long], { icon: greyIcon }).addTo(mymapGPS)
        theCircle = L.circle([Lat, Long], { radius: RadioMap }).addTo(mymapGPS);

        mymapGPS.setView([Lat, Long], Zoomval)


        var parametro = {};

        var latneg = LatMain - (RadioMap / 111000)
        var RadioGPS = LatMain - latneg;
        var latneg2 = LatMain - (100 / 111000)
        var RadioGPS2 = LatMain - latneg2;
        var HuecoCercano = false;

        $.ajax({
            type: 'POST',
            url: '../Home/ConsultaReporteGeneral',
            data: JSON.stringify(parametro),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                var html = '';
                var contador = 0;
                var backgrounbr = "";

                $.each(data.datosGPSR, function (index, item) {

                    if (item.Estado == 1) {

                        let ladoad = item.Latitud - Lat;
                        let ladoop = item.Longitud - Long;
                        var hp2 = Math.sqrt((ladoad * ladoad) + (ladoop * ladoop))

                        if (hp2 < RadioGPS) {

                            if (hp2 < RadioGPS2) {
                                HuecoCercano = true;
                            }


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

                            let idLike = "Like" + item.Id_Reporte;
                            let idDislike = "Dislike" + item.Id_Reporte;
                            let inputLike = "inputLike" + item.Id_Reporte;
                            let inputDislike = "inputDislike" + item.Id_Reporte;


                            theMarker2 = L.marker([item.Latitud, item.Longitud], { icon: greyIcon }).addTo(mymapGPS).bindPopup('<div class="ContImgPop1"><img src="../Img/ReporteHuecos/' + item.Url_Img + '" alt=""></div>' +
                                '<div class="ContTxtPop1">' +
                                '<Span>Id Registro: </Span> ' + item.Id_Reporte + ' <br>' +
                                '<Span>Fecha Registro: </Span> ' + item.FechaRegistro + ' <br>' +
                                '<Span>Tipo de hueco: </Span> ' + tipoHueco + ' <br>' +
                                '<Span>Direccion: </Span> ' + item.Direccion + '<br>' +
                                '<Span>Coordenadas: </Span> ' + item.Latitud + ' , ' + item.Longitud + ' <br>' +
                                '<Span><i class="fa-solid fa-thumbs-up"></i></Span> <input id="' + inputLike +'" type="text" class="InputLikeDis" value ="' + item.Like + '"> <br>' +
                                '<Span> <i class="fa-solid fa-thumbs-down"></i> </Span><input id="' + inputDislike +'" type="text" class="InputLikeDis" value =" ' + item.DisLike + '"><br>' +
                                '<Span>Descripción: </Span> ' + item.Descripcion + '<br>' +
                                '<div class="ContBtnLike"><button id="' + idLike + '" onclick="InteraccionReport(1,' + item.Id_Reporte + ')"><i class="fa-regular fa-thumbs-up"></i></button><button id="' + idDislike +'" onclick="InteraccionReport(2,' + item.Id_Reporte +')"><i class="fa-regular fa-thumbs-down"></i> </button></div>' +
                                '</div>');

                        }

                     }

                });

                if (HuecoCercano) {
                    theCircleRed = L.circle([Lat, Long], { radius: 100 }).addTo(mymapGPS);
                    theCircleRed.setStyle({ fillColor: 'red' });
                    var sonido = new Audio();
                    sonido.src = "../Img/Media/AlertaPrincipal.mp3";
                    sonido.play();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                EventoModalNotification(RespEvent);
            }
        });


    }

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

function InteraccionReport(x, idReport) {
    var parametro = { IdRegistro: idReport, TipoLike: x };

    $.ajax({
        type: 'POST',
        url: '../Home/RegistroInteraccion',
        data: JSON.stringify(parametro),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function (data) {
            let idLike = document.getElementById("Like" + idReport);
            let idDislike = document.getElementById("Dislike" + idReport);
            let inputLike = document.getElementById("inputLike" + idReport);
            let inputDislike = document.getElementById("inputDislike" + idReport);

            if (x == 1) {
                if (idLike.classList.contains('BtnActivoGreen')) {
                    inputLike.value = parseInt(inputLike.value) - 1
                    $(idLike).removeClass('BtnActivoGreen');
                } else {
                    inputLike.value = parseInt(inputLike.value) + 1
                    $(idLike).addClass('BtnActivoGreen');
                }

                if (idDislike.classList.contains('BtnActivoRed')) {
                    inputDislike.value = parseInt(inputDislike.value) - 1
                    $(idDislike).removeClass('BtnActivoRed');
                }
            }

            if (x == 2) {

                if (idDislike.classList.contains('BtnActivoRed')) {
                    inputDislike.value = parseInt(inputDislike.value) - 1
                    $(idDislike).removeClass('BtnActivoRed');
                } else {
                    inputDislike.value = parseInt(inputDislike.value) + 1
                    $(idDislike).addClass('BtnActivoRed');
                }
                if (idLike.classList.contains('BtnActivoGreen')) {
                    inputLike.value = parseInt(inputLike.value) - 1
                    $(idLike).removeClass('BtnActivoGreen');
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
            EventoModalNotification(RespEvent);
        }
    });
}
