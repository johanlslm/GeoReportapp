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
});