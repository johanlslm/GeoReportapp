function onMapClick(e) {
	var cordinateMouse = L.marker(e.latlng);
	cordinateMouse.addTo(mymap);
	var cordinate2 = e.latlng.toString();
	alert(cordinate2);
	var array = cordinate2.split(',');
	var b = array[0];
	b = b.replace(/[^\d.-]/g, '');
	b = parseFloat(b);
	var c = array[1];
	c = c.replace(/[^\d.-]/g, '');
	c = parseFloat(c);
}
alert("entro")