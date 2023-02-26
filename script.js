
let winnerImage = ['0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%'];
shufflePictures();
Puzzle()


// При кліку на 'start' запускається таймер
let countdown;
$('.start').on('click', function() {
    let countDownDate = new Date().getTime() + (60 * 1000); // встановлення часу зворотного відліку на 1 хвилину
    countdown = setInterval(function startTimer() {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let seconds = Math.floor((distance % (1000 * 60)) / 1000); // кількість секунд, що залишилися

      if (seconds < 10) $(".timer-clock").text("00" + ':' + '0' + seconds);
      else $(".timer-clock").text("00" + ":" + seconds);

      $('.start').prop("disabled", true).css("opacity", "0.7");
      $('.check').prop("disabled", false).css("opacity", "1");

      if (distance < 0) { // коли відлік закінчиться
        clearInterval(countdown);
        $(".timer-clock").text("Time's up!");
        $("#start-btn").prop("disabled", false);
      }
      Puzzle();
    })
});

// вікно-питання чи дійсно ви хочете перевірити пазл
$('.check').on('click', function(){
    $('.question-window').css({
        display: 'block',
        animation: '0.5s forwards fadeInDown',
    })
    $('body').css('animation', '1s forwards bgAppear')
});

// зачинити вікно-питання
$('.close-btn').on('click', function(){
    $('.question-window').css({
        display: 'none',
        animation: 'none',
    })
    $('body').css('animation', 'none')
});

// певірка на добре складений пазл
$('.check-btn').on('click', function(){
    clearInterval(countdown);
    checkPuzzle();
    $('.start').prop("disabled", true).css("opacity", "0.7");
    $('.check').prop("disabled", true).css("opacity", "0.7");
});


// Функція для перемішування позицій картинок
function shufflePictures() {
    let arrRandom = ['0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%'];
        arrRandom = arrRandom.sort(() => Math.random() - 0.5);
        $('.number').each(function (index, element) {
            $(this).css('background-position', arrRandom[index]);
        });
}  

// Слухач подій для кнопки 'New game'
$(".new-game").on("click", function() {
    location.reload();
});

// Функції
function Puzzle() {
    $('.number').draggable({
        containment: 'gamefield',
        revert: 'invalid',
        start: function () {
            if ($(this).hasClass('dropped-puzzle')) {
                $(this).removeClass('dropped-puzzle');
                $(this).parent().removeClass('puzzle-present');
            }
        }
    });

    $('.droppable').droppable({
        accept: function () {
            return !$(this).hasClass('puzzle-present')
        },
        drop: function (event, ui) {
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            droppedOn.addClass('puzzle-present');
            $(draggableElement).addClass('dropped-puzzle');
            $(draggableElement).css({
                top: 0,
                left: 0,
                position: 'relative'
            }).appendTo(droppedOn);
        },
    });
};

function checkPuzzle() {
    if ($('#droparea .dropped-puzzle').length != 16) {
        looseWindow();
        return false;
    } 
    for (let i = 0; i < 16; i++) {
        let item = $(`#droparea .dropped-puzzle:eq(${i})`).css('background-position');
        let order = winnerImage[i];
        if (item != order) {
            looseWindow();
            return false;
        } 
        successWindow();
        return true;
    };
};

function looseWindow() {
    $('.loose-window').css({
        display: 'block',
        animation: '0.5s forwards fadeInDown',
    })
    $('.question-window').css({
        display: 'none',
    })
    $('.close-btn').on('click', function(){
        $('.loose-window').css({
            display: 'none',
        })
    });
}

function successWindow() {
    $('.success-window').css({
        display: 'block',
        animation: '0.5s forwards fadeInDown',
    })
    $('.question-window').css({
        display: 'none',
    })
    $('.close-btn').on('click', function(){
        $('.success-window').css({
            display: 'none',
        })
    });
}




















// Чернетка

// інший (перший) варіант перемішування картинок
// let start = $("#start");
//     let imgs = start.children();
//     console.log(imgs);
//     while (imgs.length) {
//         start.append(imgs.splice(Math.floor(Math.random() * imgs.length), 1)[0]);
//     }

// інший (другий) варіант перемішування картинок
// let pictures = $(".number");
//     let i = pictures.length;
//     while (i--) {
//       let randomIndex = Math.floor(Math.random() * (i + 1));
//       let temp = pictures[randomIndex];
//       pictures[randomIndex] = pictures[i];
//       pictures[i] = temp;
//     }
//     $("#start").empty().append(pictures);

// інша функція на drag and drop
// function Puzzle() {
//     for (let i = 1; i <= 16; i++) {
//         $('#num'+i).draggable({
//             scope: 'cell'+i,
//             containment: 'gamefield',
//             snap: ".droppable",
//             snapMode: "inner",
//             snapTolerance: 15,
//             collision: "fit",
//         });
        
     
//         $('#drop'+i).droppable({
//             scope: 'cell'+i,
//         });
//     }
// }