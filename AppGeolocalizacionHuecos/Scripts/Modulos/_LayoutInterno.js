$(document).ready(function () {
    let btnMenuConten = document.getElementById('contInternoMen');
    let btnMenuUser = document.getElementById('contInternoUser');
    let ContMenu = document.querySelector('.MenuModaAcceso');
    let ContMenuUser = document.querySelector('.MenuModaUser');
    window.addEventListener('click', function (e) {
        if (ContMenu.contains(e.target) == false && ContMenu.classList.contains('activar') && btnMenuConten.contains(e.target) != true) {
            MenuEventClick();
        }
        if (ContMenuUser.contains(e.target) == false && ContMenuUser.classList.contains('activar') && btnMenuUser.contains(e.target) != true) {
            MenuUserEventClick();
        }
    });

    /************************************************** DESPLIEGUE MENU ACCESOS **************************************************/
    btnMenuConten.addEventListener('click', () => {
        MenuEventClick();
    });

    function MenuEventClick(e) {

        if (ContMenu.classList.contains('activar')) {
            ContMenu.classList.remove('activar');
            ContMenu.classList.add('desactivar');
            btnMenuConten.classList.remove('rotateArrow')
        } else {
            ContMenu.classList.remove('desactivar');
            ContMenu.classList.add('activar');
            btnMenuConten.classList.add('rotateArrow')
        }
    }
    /************************************************** DESPLIEGUE MENU USUARIO **************************************************/
    btnMenuUser.addEventListener('click', () => {
        MenuUserEventClick();
    });

    function MenuUserEventClick() {

        if (ContMenuUser.classList.contains('activar')) {
            ContMenuUser.classList.remove('activar');
            ContMenuUser.classList.add('desactivar1');
            btnMenuUser.classList.remove('rotateArrow')
        } else {
            ContMenuUser.classList.remove('desactivar1');
            ContMenuUser.classList.add('activar');
            btnMenuUser.classList.add('rotateArrow')
        }
    }


    /************************************************** DESPLIEGUE SUB MENUS **************************************************/

    $('.list__button').click(function (e) {
        e.preventDefault();
        let LiElement = document.querySelectorAll('.list__button');
        let DValThis = $(this).attr('data-value');
        LiElement.forEach(contElem => {
            let DValThisSiblings = $(contElem).attr('data-value');
            if (DValThisSiblings == DValThis && contElem.classList.contains('list__button--click')) {
                let height = 0;
                let MenuItm = contElem.nextElementSibling;
                contElem.classList.toggle('arrow');
                if (MenuItm.clientHeight == "0") {
                    height = MenuItm.scrollHeight;
                }
                MenuItm.style.height = `${height}px`;
            } else if (DValThisSiblings != DValThis && contElem.classList.contains('list__button--click')) {
                let height = 0;
                let MenuItm = contElem.nextElementSibling;
                MenuItm.style.height = `${height}px`;
                contElem.classList.remove('arrow');
            }
        });
    });


});

