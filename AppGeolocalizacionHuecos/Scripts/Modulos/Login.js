﻿$(document).ready(function () {
    $('.BtnLoginval').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('BtnEnabled');
        $(this).toggleClass('BtnDisabled');
        $(this).siblings().toggleClass('BtnEnabled');
        $(this).siblings().toggleClass('BtnDisabled');
        if ($(this).val() == 1) {
            $('.ContFormLogin').addClass('activar');
            $('.ContFormLogin').removeClass('desactivar');
            $('.ContFormRegis').addClass('desactivar');
            $('.ContFormRegis').removeClass('activar');
        } else {
            $('.ContFormRegis').addClass('activar');
            $('.ContFormRegis').removeClass('desactivar');
            $('.ContFormLogin').addClass('desactivar');
            $('.ContFormLogin').removeClass('activar');
        }
    });
    $('.inputEventEnterLogin').keypress(function (event) {
        if (event.keyCode === 13) {
            document.getElementById('BtnLoginEvent').click();
        }
    });
    $('.inputEventEnterSignIn').keypress(function (event) {
        if (event.keyCode === 13) {
            document.getElementById('BtnSignInEvent').click();
        }
    });
    $('.RestPassw').click(function (e) {
        e.preventDefault();
        OpenModalRecover();
    });
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
        if (element.Tipo == 1 && ErrorVal == false) {
            expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expr.test(ElemValInput.value)) {
                TipoVal = 1;
                ErrorVal = true;
                TipoErrorCampo = 2
                TxtVal = "Correo con formato incorrecto";
            }
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
            DTOInfoModalNot = { Color: "Naranja", Icono: "Alerta", TxtInfo: "Correo con formato incorrecto" };
            break;
        case 3:
            DTOInfoModalNot = { Color: "Azul", Icono: "Password", TxtInfo: "Correo no registrado en el sistema" };
            break;
        case 4:
            DTOInfoModalNot = { Color: "Azul", Icono: "Password", TxtInfo: "Contraseña incorrecta" };
            break;
    }
    OpenAlertInfo(DTOInfoModalNot);
}

async function IngresarLoginEvent() {
    let InputLoginEmail = document.getElementById('inputEmailLogin');
    let InputLoginPassword = document.getElementById('inputPasswordLogin');
    let ObjVal = [{ Elemento: InputLoginEmail.id, Tipo: 1 }, { Elemento: InputLoginPassword.id, Tipo: 2 }];
    let RespuestaValidacion = validarCampos(ObjVal);
    if (RespuestaValidacion.ErrorRespuesta) {
        EventoModalNotification(RespuestaValidacion);
    } else {
        LoadingStar('Validando usuario')
        var parametro = {
            CorreoVali: InputLoginEmail.value, PassWordVali: InputLoginPassword.value
        };
        console.log(parametro)
        $.ajax({
            type: 'POST',
            url: '../Home/IngresarLoginEvent',
            data: JSON.stringify(parametro),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                loadingBlStop();
                if (data.error) {
                   
                } else {

                   
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
    }
}

async function RegistroLoginEvent() {
    let InputSignName = document.getElementById('InputTxtNameSignIn');
    let InputSignLName = document.getElementById('InputTxtLastNameSignIn');
    let InputSignEmail = document.getElementById('InputTxtemailSignIn');
    let InputSignPass = document.getElementById('InputTxtPassSignIn');
    let InputSignConf = document.getElementById('InputTxtConfirmPassSignIn');

    let ObjVal = [{ Elemento: InputSignName.id, Tipo: 2 }, { Elemento: InputSignLName.id, Tipo: 2 }, { Elemento: InputSignEmail.id, Tipo: 1 }, { Elemento: InputSignPass.id, Tipo: 2 }, { Elemento: InputSignConf.id, Tipo: 2 },];

    let RespuestaValidacion = validarCampos(ObjVal);

    if (RespuestaValidacion.ErrorRespuesta) {
        EventoModalNotification(RespuestaValidacion);
    } else {
        LoadingStar('Validando datos de registro')
    }
}

async function LoginRecoverPassword() {
    let inputRecoverPass = document.getElementById('InputEmailRecoverPass');
    let ObjVal = [{ Elemento: inputRecoverPass.id, Tipo: 1 }];
    let RespuestaValidacion = validarCampos(ObjVal);
    if (RespuestaValidacion.ErrorRespuesta) {
        let DTOValidadorRecover = { Elemento: inputRecoverPass, ObjRespusta: RespuestaValidacion }
        ValidadorEmailRecover(DTOValidadorRecover);
    }
    else {
        LoadingStar('Verificando datos del correo')
    }

}
function ValidadorEmailRecover(DTOinfo) {
    let ParentInput = DTOinfo.Elemento.parentNode;
    if (DTOinfo.ObjRespusta.TipoErrorCampoVal != 6) {
        $(ParentInput).removeClass('valido');
        $(ParentInput).addClass('invalido');
        ParentInput.setAttribute("title", DTOinfo.ObjRespusta.TextInfo);
    } else {
        $(ParentInput).removeClass('invalido');
        $(ParentInput).addClass('valido');
    }
}
function ClearInputsRegister() {
    let InputEventClear = document.querySelectorAll('.ContFormRegis input');
    InputEventClear.forEach(element => {
        element.value = "";
    });
}