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
				//generar alerta visual;
			} else {
				let latitud;
				let longitud;
				function ubicacion(geolocationPosition) {
					latitud = geolocationPosition.coords.latitude;
					longitud = geolocationPosition.coords.longitude;
					DrawMarker(latitud, longitud);
				}
				const onErrorDeUbicacion = err => {
					//generar error de ubicacion
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
			//llamar libreria de errores
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
						//alerta de error
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
		geocoder.geocode({ location: latlng }).then((response) => {
			$('#InputDirSearchGPS1').val(response.results[0].formatted_address)
		})


	}

    $('#FileImportIMGGPS').change(function (e) {
        addImage(e);
    });
});

var nombreImagen;

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

function GuardarImagen() {
    var file = document.getElementById('FileImportIMGGPS').files[0];

    if (file === undefined) {
        $.confirm({
            title: 'Alerta!!!',
            typeAnimated: true,
            useBootstrap: false,
            type: 'orange',
            icon: 'fas fa-exclamation-triangle',
            boxWidth: '40%',
            content: 'Debe seleccionar la imagen',
            buttons: {
                ok: function () {
                },

            }
        });
    } else {
        fileToBase64(file).then(function (result) {
            CrarPublicidad(result);
        });
    }
}

function CrarPublicidad(result) {
    var id = getRandomInt(1, 37757);
    var ImagenAletoria = id + nombreImagen;
        
        var parametros = {
            base64Imagen: result, imagenNombre: ImagenAletoria
        };
        $.ajax({
            type: 'POST',
            url: '../Home/CrearPublicidad',
            data: JSON.stringify(parametros),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    $.confirm({
                        title: 'Error!',
                        typeAnimated: true,
                        useBootstrap: false,
                        type: 'red',
                        icon: 'fas fa-times',
                        boxWidth: '20%',
                        content: data.msj,
                        buttons: {
                            Ok: function () {

                            }
                        }
                    });
                }
                else {
                    loadingBlStop();
                    $.confirm({
                        title: 'Informacion!',
                        typeAnimated: true,
                        useBootstrap: false,
                        type: 'blue',
                        boxWidth: '20%',
                        icon: "fas fa-check",
                        content: data.msj,
                        buttons: {
                            Ok: function () {
                                location.reload();
                            }
                        }
                    });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    
}


