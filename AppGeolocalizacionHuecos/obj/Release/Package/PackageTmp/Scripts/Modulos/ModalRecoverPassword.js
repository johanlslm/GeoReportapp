async function OpenModalRecover() {
    let linkRecover;
    linkRecover = document.createElement('link');
    linkRecover.href = "../../Content/Modulos/ModalRecoverPassword.css";
    linkRecover.type = "text/css";
    linkRecover.rel = "stylesheet";
    linkRecover.id = "stylesheetModalRecover";
    document.head.appendChild(linkRecover);

    setTimeout(function () {
        const ModalRecoverBody = document.querySelector('body');
        const ModalRecoverDiv = document.createElement('div');
        ModalRecoverBody.appendChild(ModalRecoverDiv);
        ModalRecoverDiv.setAttribute("id", "ContainerMainRecoverPass");

        let DrawModalRecover = '<div class="ContainerRecoverPass desactivarModal">' +
            '<h1>¿Has olvidado la contraseña?</h1>' +
            '<h3>Enviaremos a tu correo electrónico una contraseña temporal, con la que podrás ingresar y gestionar la personalización de una nueva contraseña.</h3>' +
            '<div class="ContInputRecoverPass valido">' +
            '<input type="text" name="" id="InputEmailRecoverPass" class="inputEventEnterLogin" required="required">' +
            '<span>Correo electronico</span>' +
            '</div>' +
            '<div class="ContButtonRecoverPass">' +
            '<button id="ButtonRecoverPass1" class="ButtonRecoverPass1" onclick="LoginRecoverPassword();">' +
            '<div class="icono">' +
            '<i class="fa-solid fa-envelope"></i>' +
            '</div>' +
            '<span>Enviar</span>' +
            '</button>' +
            '</div>' +
            '<div class="BtnCloseModalRecover">' +
            '<button class="BtnIntModalRecover" onclick="CloseModalRecover();">' +
            '<i class="fa-solid fa-xmark"></i>' +
            '</button>' +
            '</div>' +
            '</div>';

        $('#ContainerMainRecoverPass').html(DrawModalRecover);
    }, 50);

    setTimeout(function () {
        document.querySelector('.ContainerRecoverPass').classList.remove('desactivarModal');
        document.querySelector('.ContainerRecoverPass').classList.add('activarModal');
        $('#InputEmailRecoverPass').keypress(function (event) {
            if (event.keyCode === 13) {
                document.getElementById('ButtonRecoverPass1').click();
            }
        });
    }, 100);
}
function CloseModalRecover() {
    document.querySelector('.ContainerRecoverPass').classList.remove('activarModal');
    setTimeout(function () {
        document.querySelector('.ContainerRecoverPass').classList.add('desactivarModal');
    }, 150);
    setTimeout(function () {
        document.getElementById('ContainerMainRecoverPass').remove();
    }, 650);
    setTimeout(function () {
        document.getElementById('stylesheetModalRecover').remove();
    }, 750);

}