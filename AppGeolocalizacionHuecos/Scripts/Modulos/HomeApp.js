$(document).ready(function () {
    $(".CardContint1").mouseout(function () {
        let LastCardTxt = this.lastElementChild
        $(LastCardTxt).removeClass('eventHoverTxt')
    })
    $(".CardContint1").mouseover(function () {
        let LastCardTxt = this.lastElementChild
        console.log(LastCardTxt)
        $(LastCardTxt).addClass('eventHoverTxt')
    });

    $('#CardHome1').click(function () {
        window.location.href = '../Home/SearchGPS';
    })
    $('#CardHome2').click(function () {
        window.location.href = '../Home/ReporteGPS';
    })
    $('#CardHome3').click(function () {
        window.location.href = '../Home/ReporteFormulario';
    })
    $('#CardHome4').click(function () {
        window.location.href = '../Home/DReporte';
    })
    $('#CardHome5').click(function () {
        window.location.href = '../Home/Administrativo';
    })

});