document.getElementById("spanhom2").addEventListener("click", function () {
    var elementInput = document.getElementById("txtPassChance2");
    var elementIcon = document.getElementById("spanhom2");

    if (elementIcon.classList.contains("active")) {
        elementIcon.classList.remove("active");
        elementIcon.innerHTML = '<i class="fas fa-low-vision spanhom" aria-hidden="true"></i>';
        elementInput.type = "password";
    } else {
        elementIcon.classList.add("active");
        elementIcon.innerHTML = '<i class="fas fa-eye spanhom"></i>';
        elementInput.type = "text";
    }
});

document.getElementById("spanhom1").addEventListener("click", function () {
    var elementInput = document.getElementById("txtPassChance1");
    var elementIcon = document.getElementById("spanhom1");

    if (elementIcon.classList.contains("active")) {
        elementIcon.classList.remove("active");
        elementIcon.innerHTML = '<i class="fas fa-low-vision spanhom" aria-hidden="true"></i>';
        elementInput.type = "password";
    } else {
        elementIcon.classList.add("active");
        elementIcon.innerHTML = '<i class="fas fa-eye spanhom"></i>';
        elementInput.type = "text";
    }
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
            DTOInfoModalNot = { Color: "Naranja", Icono: "Password", TxtInfo: TipoModal.TextInfo };
            break;
        case 3:
            DTOInfoModalNot = { Color: "Azul", Icono: "Usuario", TxtInfo: TipoModal.TextInfo };
            break;
        case 4:
            DTOInfoModalNot = { Color: "Rojo", Icono: "Fallo", TxtInfo: TipoModal.TextInfo };
            break;
    }
    OpenAlertInfo(DTOInfoModalNot, TipoModal.Confirmar);

}

async function ChangePasswordEvent() {
    LoadingStar('Validando informacion')

    let InputPass1 = document.getElementById('txtPassChance1');
    let InputPass2 = document.getElementById('txtPassChance2');
    let ObjVal = [{ Elemento: InputPass1.id }, { Elemento: InputPass2.id }];
    let RespuestaValidacion = validarCampos(ObjVal);

    if (RespuestaValidacion.ErrorRespuesta) {
        EventoModalNotification(RespuestaValidacion);
        LoadingStop();
    } else {
        var parametro = {
            PassConf1: InputPass1.value, PassConf2: InputPass2.value
        };
        $.ajax({
            type: 'POST',
            url: '../Home/ChangePasswordEvent',
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
                    if (data.datosmodal == 2) {

                        let Confirmar = function Confirmar() { window.location.href = '../' + data.URLAction; };
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

