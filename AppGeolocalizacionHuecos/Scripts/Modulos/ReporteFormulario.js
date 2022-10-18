$(document).ready(function () {

});


async function AbrirModalInfoReport() {
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
            '<div class="ContReport1IMG"><div class="ContReportIntImg1"><img src="prueba.jpg" alt=""></div></div>' +
            '<div class="ContReport2Info">' +
            '<div class="ContSpanReport"><span>ID REPORTE: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span>Dirección: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span>Coordenadas: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span>Tipo Hueco: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span>Estado: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span><i class="fa-regular fa-thumbs-up"></i> / <i class="fa-sharp fa-solid fa-thumbs-down"></i></span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba --</div>' +
            '<div class="ContSpanReport"><span>Descripción: </span></div>' +
            '<div class="ContInfoReporSpecific"> -- prueba  -- </div>' +
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