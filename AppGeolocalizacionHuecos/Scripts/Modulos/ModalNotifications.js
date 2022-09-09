async function OpenAlertInfo(DTOInfoModal) {
    let link;
    link = document.createElement('link');
    link.href = "../../Content/Modulos/ModalNotifications.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "stylesheetModalNotifications";
    document.head.appendChild(link);
    setTimeout(function () {
        let Colorlist = [{ color: 'Azul', Codigo: '--clModalBlue' }, { color: 'Verde', Codigo: '--clModalGreen' }, { color: 'Rojo', Codigo: '--clModalRed' }, { color: 'Naranja', Codigo: '--clModalOrange' }, { color: 'Gris', Codigo: '--clModalSilver' }];
        let IconList = [{ icon: "Alerta", Codigo: "fa-solid fa-person-circle-exclamation" }, { icono: "Password", Codigo: "fa-solid fa-key" }, { icono: "Usuario", Codigo: "fa-solid fa-user-astronaut" }, { icono: "Fallo", Codigo: "fa-solid fa-circle-radiation" }, { icono: "Confirmar", Codigo: "fa-solid fa-face-smile" }]

        let ColorModalInfo = (Colorlist.find(x => x.color == DTOInfoModal.Color)).Codigo;
        let IconModalInfo = (IconList.find(x => x.icon == DTOInfoModal.Icono)).Codigo;
        let TxtModalInfo = DTOInfoModal.TxtInfo;

        const ModalInfoBody = document.querySelector('body');
        const ModalInfoDiv = document.createElement('div');
        ModalInfoBody.appendChild(ModalInfoDiv);
        ModalInfoDiv.setAttribute("id", "ContModalNoti");

        let DrawModalInfo = '<div class="ContModalInt desactivarModal" style="box-shadow: 0px 5px 20px 1px var(' + ColorModalInfo + ')">' +
            '<span class="BorderContent" style="background: var(' + ColorModalInfo + ');"></span>' +
            '<div class="ContInt1ModNot">' +
            '<div class="DivModaConIntNot1">' +
            '<div class="contIcnModalNoti">' +
            '<i class="' + IconModalInfo + '" style=" border: 5px solid var(' + ColorModalInfo + '); color: var(' + ColorModalInfo + ');"></i>' +
            '</div>' +
            '<div class="contTxtModalNoti">' +
            '<span>' + TxtModalInfo + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="DivModaConIntNot2">' +
            '<button class="BtnContentModalNoti ContInfoModalBtn1" onClick="CloseAlertInfo();">' +
            '<div class="icono">' +
            '<i class="fa-solid fa-thumbs-up"></i>' +
            '</div>' +
            '<span>Confirmar</span>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<span class="BorderContent" style="background: var(' + ColorModalInfo + ');"></span>' +
            '</div>';
        $('#ContModalNoti').html(DrawModalInfo);
    }, 50);

    setTimeout(function () {
        document.querySelector('.ContModalInt').classList.remove('desactivarModal');
        document.querySelector('.ContModalInt').classList.add('activarModal');
    }, 100);
}
function CloseAlertInfo() {
    document.querySelector('.ContModalInt').classList.remove('activarModal');
    setTimeout(function () {
        document.querySelector('.ContModalInt').classList.add('desactivarModal');
    }, 150);
    setTimeout(function () {
        document.getElementById('ContModalNoti').remove();
    }, 650);
    setTimeout(function () {
        document.getElementById('stylesheetModalNotifications').remove();
    }, 750);

}