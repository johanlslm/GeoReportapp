$(document).ready(function () {
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
    switch (TipoModal.RespEvent.TipoRespuesta) {
        case 1:
            DTOInfoModalNot = { Color: "Naranja", Icono: "Alerta", TxtInfo: TipoModal.RespEvent.TextInfo };
            break;
        case 2:
            DTOInfoModalNot = { Color: "Naranja", Icono: "Password", TxtInfo: TipoModal.RespEvent.TextInfo };
            break;
        case 3:
            DTOInfoModalNot = { Color: "Azul", Icono: "Usuario", TxtInfo: TipoModal.RespEvent.TextInfo };
            break;
        case 4:
            DTOInfoModalNot = { Color: "Rojo", Icono: "Fallo", TxtInfo: TipoModal.RespEvent.TextInfo };
            break;
    }
    OpenAlertInfo(DTOInfoModalNot, TipoModal.Confirmar);
    
}

function ValidadorEmailRecover(DTOinfo) {

    let ParentInput = DTOinfo.Elemento.parentNode;
    if (DTOinfo.ObjRespusta.TipoErrorCampoVal != 10) {
        $(ParentInput).removeClass('valido');
        $(ParentInput).addClass('invalido');
        ParentInput.setAttribute("title", DTOinfo.ObjRespusta.TextInfo);
    } else {
        $(ParentInput).removeClass('invalido');
        $(ParentInput).addClass('valido');
    }
    if (DTOinfo.ObjRespusta.TipoErrorCampoVal == 10) {
        let RespEvent = { TipoRespuesta: 3, TextInfo: DTOinfo.ObjRespusta.TextInfo }
        let Confirmar = function Confirmar() { document.querySelector('.BtnIntModalRecover').click(); }
        let OBJEnviar = { RespEvent, Confirmar }
        EventoModalNotification(OBJEnviar);
    }
}

function ClearInputsRegister() {
    let InputEventClear = document.querySelectorAll('.ContFormRegis input');
    InputEventClear.forEach(element => {
        element.value = "";
    });
}

async function IngresarLoginEvent() {
    LoadingStar('Validando usuario')

    let InputLoginEmail = document.getElementById('inputEmailLogin');
    let InputLoginPassword = document.getElementById('inputPasswordLogin');
    let ObjVal = [{ Elemento: InputLoginEmail.id, Tipo: 1 }, { Elemento: InputLoginPassword.id, Tipo: 2 }];
    let RespuestaValidacion = validarCampos(ObjVal);
    if (RespuestaValidacion.ErrorRespuesta) {
        let RespEvent1 = { TipoRespuesta: RespuestaValidacion.TipoRespuesta, TextInfo: RespuestaValidacion.TextInfo }
        let RespEvent = { RespEvent: RespEvent1 }
        LoadingStop();
        EventoModalNotification(RespEvent);
    } else {
        var parametro = {
            CorreoVali: InputLoginEmail.value, PassWordVali: InputLoginPassword.value
        };
        $.ajax({
            type: 'POST',
            url: '../Home/IngresarLoginEvent',
            data: JSON.stringify(parametro),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                LoadingStop();
                console.log(data);
                var RespEvent = { TipoRespuesta: data.TipoRespuesta, TextInfo: data.txtTextInfo };
                let objEnviarModal;
                if (data.Error) {
                    EventoModalNotification(RespEvent);
                } else {
                    
                    if (data.datosmodal.Respuesta == 6) {
                        
                        let Confirmar = function Confirmar(){ window.location.href = '../' + data.URLAction; };
                        objEnviarModal = { RespEvent, Confirmar }
                        EventoModalNotification(objEnviarModal);

                    } else {
                        objEnviarModal = { RespEvent }
                        EventoModalNotification(objEnviarModal);
                    }
                    
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                LoadingStop();
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                EventoModalNotification(RespEvent);
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
        LoadingStar('Validando datos de registro');

        var parametro = {
            NombresVali: InputSignName.value, ApellidosVali: InputSignLName.value, CorreoVali: InputSignEmail.value, PassWordVali: InputSignPass.value, PassWord2Vali: InputSignConf.value
        };
        
        $.ajax({
            type: 'POST',
            url: '../Home/RegistroLoginEvent',
            data: JSON.stringify(parametro),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                LoadingStop();
                var RespEvent = { TipoRespuesta: data.TipoRespuesta, TextInfo: data.txtTextInfo };
                let objEnviarModal;
                
                if (data.Error) {
                    EventoModalNotification(RespEvent);
                } else {
                    
                    if (data.datosmodal== 3) {

                        let Confirmar = function Confirmar() { document.querySelector('.BtnRegisClear').click(); document.getElementById('BtnLoginval1').click(); };
                        objEnviarModal = { RespEvent, Confirmar }
                        EventoModalNotification(objEnviarModal);

                    } else {
                        objEnviarModal = { RespEvent }
                        EventoModalNotification(objEnviarModal);
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                LoadingStop();
                var RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                EventoModalNotification(RespEvent);
            }
        });



    }
}

async function LoginRecoverPassword() {
    let inputRecoverPass = document.getElementById('InputEmailRecoverPass');
    let ObjVal = [{ Elemento: inputRecoverPass.id, Tipo: 1 }];
    let RespuestaValidacion = validarCampos(ObjVal);
    let DTOValidadorRecover;

    if (RespuestaValidacion.ErrorRespuesta) {
        DTOValidadorRecover = { Elemento: inputRecoverPass, ObjRespusta: RespuestaValidacion }
        ValidadorEmailRecover(DTOValidadorRecover);
    }
    else {
        LoadingStar('Verificando datos del correo')
        var parametro = {
            EmailResetPass: inputRecoverPass.value
        };
        
        $.ajax({
            type: 'POST',
            url: '../Home/LoginRecoverPassword',
            data: JSON.stringify(parametro),
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            success: function (data) {

                LoadingStop();

                RespuestaValidacion = { TextInfo : data.txtTextInfo, TipoErrorCampoVal : data.TipoRespuesta }
                DTOValidadorRecover = { Elemento: inputRecoverPass, ObjRespusta: RespuestaValidacion }

                if (data.Error) {
                    let RespEvent = { TipoRespuesta: 4, TextInfo: data.txtTextInfo }
                    EventoModalNotification(RespEvent);
                } else {
                    ValidadorEmailRecover(DTOValidadorRecover);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                LoadingStop();
                let RespEvent = { TipoRespuesta: 4, TextInfo: "Error no controlado, reintente mas tarde" }
                EventoModalNotification(RespEvent);
            }
        });
    }

}

function prueba() {
    alert("commit de prueba");
}