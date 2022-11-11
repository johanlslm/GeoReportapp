var nombreImagen;

$(document).ready(function () {
	var theMarker = {};
    var latlng = [4.583868359826262, -74.2134189605713];
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
	mymapGPS.on('dblclick', onMapClick);

	function onMapClick(e) {
		DrawMarker(e.latlng.lat, e.latlng.lng);
    }

	$('#btnGPSRepor1Act').click(function GenerarUbitacion() {
        if (!"geolocation" in navigator) {
                var RespEvent = { TipoRespuesta:1, TextInfo: "El navegador no tiene habilitada la busqueda por GPS, intenta por busqueda manual" }
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

	$('#btnGPSRepor3Act').click(function GenerarUbitacion() {
		let inputDirSearch = document.getElementById('btnGPSRepor2Act');
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
			geocoder.geocode({ "address": inputAddress}, function (results, status) {
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

	$('#btnGPSRepor2Act').keypress(function (event) {
		if (event.keyCode === 13) {
			document.getElementById('btnGPSRepor3Act').click();
		}
	});

	function DrawMarker(Lat, Long) {

		lat = Lat;
		lon = Long;

		if (theMarker != undefined) {
			mymapGPS.removeLayer(theMarker);
		};
		const geocoder = new google.maps.Geocoder();
		const latlng = { lat: Lat, lng: Long };
		theMarker = L.marker([Lat, Long]).addTo(mymapGPS)
		
		mymapGPS.setView([Lat, Long], 18)
        $('#InputDirSearchGPS2').val(Lat + " , " + Long)
        $('#LatDirSearchGPS1').val(Lat)
        $('#LngDirSearchGPS2').val(Long)
		geocoder.geocode({ location: latlng }).then((response) => {
			$('#InputDirSearchGPS1').val(response.results[0].formatted_address)
		})


	}

    $('#FileImportIMGGPS').change(function (e) {
        addImage(e);
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

function validarCampos(ObjCamposVal) {
    let TipoVal = 0;
    let ErrorVal = false;
    let TxtVal;
    let TipoErrorCampo = 0;
    let respuesta;
    ObjCamposVal.forEach(element => {
        let ElemValInput = document.getElementById(element.Elemento);
        if (ElemValInput.value === null || ElemValInput.value === "") {
            TipoVal = 1;
            TipoErrorCampo = 1
            ErrorVal = true;
            TxtVal = "Todos los campos deben estar completos";
        }
    });
    return respuesta = { TipoRespuesta: TipoVal, ErrorRespuesta: ErrorVal, TextInfo: TxtVal, TipoErrorCampoVal: TipoErrorCampo };
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function addImage(e) {
    var file = e.target.files[0],
        imageType = /image.*/;
    if (!file.type.match(imageType))
        return;

    var reader = new FileReader();
    reader.onload = fileOnload;
    reader.readAsDataURL(file);
    nombreImagen = file.name;
}

function fileOnload(e) {
    var result = e.target.result;
    var imagenSelccionada = document.getElementById("ContInputFileIMG");
    imagenSelccionada.setAttribute("src", result);
}

function fileToBase64(file) {
    return new Promise(resolve => {
        var reader = new FileReader(file);
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function GenerarRegistro() {
    var file = document.getElementById('FileImportIMGGPS').files[0];

    if (file === undefined) {
        let TipoRespuesta = 1;
        let TextInfo = "Debe enviar la evidencia fotografica del problema a reportar!"
        let objEnviarModal = { TipoRespuesta, TextInfo };
        EventoModalNotification(objEnviarModal);
    } else {
        fileToBase64(file).then(function (result) {
            GenerarRegistroEvent(result);
        });
    }
}

function GenerarRegistroEvent(result) {
    LoadingStar('Validando registro')
    var id = getRandomInt(1, 999999);
    var ImagenAletoria = id + nombreImagen;
    let inputDir = document.getElementById('InputDirSearchGPS1');
    let inputUbi = document.getElementById('InputDirSearchGPS2');
    let inputTipoH = document.getElementById('InputDirSearchGPS3');
    let inputDesc = document.getElementById('InputDirSearchGPS4');
    let inputLat = document.getElementById('LatDirSearchGPS1');
    let inputLng = document.getElementById('LngDirSearchGPS2');

    let val1 = [{ Elemento: inputDir.id }, { Elemento: inputUbi.id }, { Elemento: inputTipoH.id }, { Elemento: inputDesc.id }]
    let ResultadoValidacion = validarCampos(val1);


    if (ResultadoValidacion.ErrorRespuesta) {
        EventoModalNotification(ResultadoValidacion);
        LoadingStop();

    } else {
        var parametros = {
            base64Imagen: result, imagenNombre: ImagenAletoria, DirValue: inputDir.value, LatValue: inputLat.value, LngValue: inputLng.value, TipoValue: parseInt(inputTipoH.value), DescValue: inputDesc.value
        };

        $.ajax({
            type: 'POST',
            url: '../Home/GenerarReporteEvent',
            data: JSON.stringify(parametros),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                LoadingStop();
                if (data.error) {
                    var RespEvent = { TipoRespuesta: data.TipoRespuesta, TextInfo: data.txtTextInfo }
                    EventoModalNotification(RespEvent);
                }
                else {
                    function confirmar() {
                        location.reload();
                    }
                    var RespEvent = { TipoRespuesta: data.TipoRespuesta, TextInfo: data.txtTextInfo, Confirmar: confirmar }
                    EventoModalNotification(RespEvent);


                }


            },
            error: function (jqXHR, textStatus, errorThrown) {
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                LoadingStop();
                EventoModalNotification(RespEvent);
            }
        });

    }
        
    
}



