$(document).ready(function () {

});

var checkinput = document.querySelectorAll('.InputStatusReport');


checkinput.forEach(contElem => {
    contElem.addEventListener('change', (event) => {
        var IdReport = parseInt(event.target.value);
        var AccionCheck;
        console.log(IdReport)

        if (event.target.checked) {
            AccionCheck = 2
        } else {
            AccionCheck = 1
        }

        var parametros = {
            IdReport: IdReport, tipoA: AccionCheck
        };

        $.ajax({
            type: 'POST',
            url: '../Home/ActualizacionEstadoRegistro',
            data: JSON.stringify(parametros),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                EventoModalNotification(RespEvent);
            }
        });

    });
});






async function AbrirModalInfoReport(img, id, dire, coor, tipoH, estadoH, like, dislike, desc, fecha) {

    setTimeout(function () {
        const ModalRecoverBodyInfo = document.querySelector('body');
        const ModalRecoverDivReport = document.createElement('div');
        ModalRecoverBodyInfo.appendChild(ModalRecoverDivReport);
        ModalRecoverDivReport.setAttribute("id", "ContainerMainRegisterInfo1");

        let DrawModalRecover = '<div class="ContainerRegisterUser desactivarModal">' +
            '<div class="BtnCloseModalRegister">' +
            '<button class="BtnCloseModalRegisterInt" onclick="CloseModalRecover();">' +
            '<i class="fa-solid fa-xmark"></i>' +
            '</button>' +
            '</div>' +
            '<div class="ContReport1IMG"><div class="ContReportIntImg1"><img src="../Img/ReporteHuecos/' + img +'" alt=""></div></div>' +
            '<div class="ContReport2Info">' +
            '<div class="ContSpanReport"><span>ID REPORTE: </span></div>' +
            '<div class="ContInfoReporSpecific">' + id + '</div>' +
            '<div class="ContSpanReport"><span>Fecha reporte: </span></div>' +
            '<div class="ContInfoReporSpecific">' + fecha + '</div>' +
            '<div class="ContSpanReport"><span>Dirección: </span></div>' +
            '<div class="ContInfoReporSpecific">' + dire +'</div>' +
            '<div class="ContSpanReport"><span>Coordenadas: </span></div>' +
            '<div class="ContInfoReporSpecific">' + coor +'</div>' +
            '<div class="ContSpanReport"><span>Tipo Hueco: </span></div>' +
            '<div class="ContInfoReporSpecific">' + tipoH +'</div>' +
            '<div class="ContSpanReport"><span>Estado: </span></div>' +
            '<div class="ContInfoReporSpecific">' + estadoH +'</div>' +
            '<div class="ContSpanReport"><span><i class="fa-regular fa-thumbs-up"></i> / <i class="fa-sharp fa-solid fa-thumbs-down"></i></span></div>' +
            '<div class="ContInfoReporSpecific">' + like + ' / ' + dislike +'</div>' +
            '<div class="ContSpanReport"><span>Descripción: </span></div>' +
            '<div class="ContInfoReporSpecific">' + desc +'</div>' +
            '</div>' +
            '</div>';
        $('#ContainerMainRegisterInfo1').html(DrawModalRecover);
    }, 50);

    setTimeout(function () {
        document.querySelector('.ContainerRegisterUser').classList.remove('desactivarModal');
        document.querySelector('.ContainerRegisterUser').classList.add('activarModal');
    }, 100);
}
function CloseModalRecover() {
    document.querySelector('.ContainerRegisterUser').classList.remove('activarModal');
    setTimeout(function () {
        document.querySelector('.ContainerRegisterUser').classList.add('desactivarModal');
    }, 150);
    setTimeout(function () {
        document.getElementById('ContainerMainRegisterInfo1').remove();
    }, 650);

}