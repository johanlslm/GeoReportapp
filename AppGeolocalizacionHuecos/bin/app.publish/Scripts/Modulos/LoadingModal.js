async function LoadingStar(TxtLoading) {
    let linkLoading;
    linkLoading = document.createElement('link');
    linkLoading.href = "../../Content/Modulos/LoadingModal.css";
    linkLoading.type = "text/css";
    linkLoading.rel = "stylesheet";
    linkLoading.id = "stylesheetModalLoading";
    document.head.appendChild(linkLoading);

    setTimeout(function () {
        if (TxtLoading == "" || TxtLoading == "") {
            TxtLoading = "Cargando"
        };

        const ModalLoadingBody = document.querySelector('body');
        const ModalLoadingDiv = document.createElement('div');
        ModalLoadingBody.appendChild(ModalLoadingDiv);
        ModalLoadingDiv.setAttribute("id", "ContainerModalLoadingMain");

        let DrawModalLoading = '<div class="ContainerLoading1 desactivarModal">' +
            '<div class="ContainerCubo"><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="ContainerLoadingInfo">' +
            '<h1>' + TxtLoading + '</h1>' +
            '<div class="loadingPoint"><img src="../../Img/LoadingPoint.gif" alt=""></div>' +
            '</div>' +
            '</div>';

        $('#ContainerModalLoadingMain').html(DrawModalLoading);
    }, 50);


    setTimeout(function () {
        document.querySelector('.ContainerLoading1').classList.remove('desactivarModal');
        document.querySelector('.ContainerLoading1').classList.add('activarModal');
    }, 100);
}
function LoadingStop() {
    setTimeout(function () {
        document.querySelector('.ContainerLoading1').classList.remove('activarModal');
    }, 200)

    setTimeout(function () {
        document.querySelector('.ContainerLoading1').classList.add('desactivarModal');
    }, 300);
    setTimeout(function () {
        document.getElementById('ContainerModalLoadingMain').remove();
    }, 800);
    setTimeout(function () {
        document.getElementById('stylesheetModalLoading').remove();
    }, 2000);
}