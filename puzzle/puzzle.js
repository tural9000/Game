$(()=>{
    $("body").css({ margin: 0, backgroundImage: `url('img/bg.jpg')`});
    let game = $('#game')
    let x = game.offset().left;
    let w = $(window).width()
     for(let i = 0,order = 0; i < 5; i++){
        for(let j = 0; j < 7; j++,order++){
            let num = `p${i}${j}`
            let dx = rand(0, 1)
            let px = dx ? -rand(90, x) : rand(580, w-500)
            let py = rand(0, 450)                                                     
                                                                   
            game.append(`<div id = "${num}" data-order="${order}" ></div>`)                               
            $(`#${num}`).css({                                      
              position: 'absolute',                                 
              backgroundImage: `url('img/puzzle.jpg')`,
              backgroundPosition: -80 * j + "px " + -80 * i + "px",  
              width: '80px',                                 
              height: '80px',
              boxShadow: '0 0 6px #bd8f2be5',
              top: 80 * i + 'px',                                        
              left: 80 * j + 'px',                              
            })
           
            $('#game1').append(`<div id = "n"></div>`) 
            setTimeout(()=>{
              $(`#${num}`).css({
                  transform: `rotate(${-5, 15}deg)`
              })
                .animate({
                  left: px + "px",
                  top: py + "px" , 
              },'slow')
            },2000) 
       
        } 
    }  
    startDrag()
    function startDrag(){
      $("#game>div")
      .draggable({ 
          revert: "invalid",
          cursorAt: { top: 50, left: 50 },
          start: function() {
              $(this).css({transform: "rotate(0deg)",boxShadow: '0 0 14px #4a237cbe',border: '2px solid #5738806b'})
              
          },
          stop: function() {
              $(this).css({boxShadow: '0 0 5px #555', border: 'none'})
              
          }
      })
      $('#game1>div').droppable({
          drop: function(event, ui) {
               let dragEl = ui.draggable;
               let dropOn = $(this);
               dropOn.addClass("piecePresent");
               $(dragEl).addClass("dragPiece")
               .css({
                   top:0,
                   left:0,
                   position: "relative"
               }).appendTo(dropOn)
               check()
          }
      });
    }
  
    function check(){
      if($('.dragPiece').length != 35){
          return false 
      }
      let count = 0
      for(let i = 0; i < 5; i++){
          for(let j = 0; j < 7; j++){
              let num = `p${i}${j}`
              let item = $(`.dragPiece:eq(${count++})`)
              let d = item.attr('id')
              console.log(num,d)
              if(d != num){
                  $('#result').text("Try again")
              }
              else{
                  $('#result').text("You win")
                  $(`#${num}`).css({boxShadow: 'none'})
              }
          }
      }
    }
  $('#d').click(function(){
      $('img').toggle('slow')
  })
  function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
      
  })