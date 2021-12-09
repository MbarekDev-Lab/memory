// select the start game button
document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What is Your Name?");
    document.getElementById('click').play();
    initializeClock('clockdiv', deadline);
    // document.getElementById('countdown');
    if (yourName == null || yourName == "") {
      document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
      document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let duration2 = 1 * 60 * 1000;
 
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  return {
    total,
    minutes,
    seconds
  };
}
function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  
  function updateClock() {
    const t = getTimeRemaining(endtime);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
    // setTimeout(() => {
    //   document.querySelector.add('.tries span')
    //   // location.reload(`${triesElement}`);
    // },duration2 + duration );
    
    if (t.total <= 0) {
      clearInterval(timeinterval); 
      prompt("Time's Up!!!!! GAME IS OVER");
    }
  }
  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + duration2);

let blocksContainer = document.querySelector(".memory-game-blocks");
  
let blocks = Array.from(blocksContainer.children);
// let hardBlocks = Array.from(hardblocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
// let orderRange = [...Array(hardBlocks.length).keys()];

// console.log(orderRange);
shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
      flipBlock(block);
    });
});

// shuffling function
function shuffle(array) {
  let current = array.length,
        temp,
        random;
  
  while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
  }
    return array;
}

  // flip the blocks function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add('is-flipped');
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
  // stop clicking function
  function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
      blocksContainer.classList.remove('no-clicking');
    }, duration);
  }

  // matched blocks
  function checkMatchedBlocks(firstBlock, secondBlock) {
    document.getElementById('monkeys').play();

    let triesElement = document.querySelector('.tries span');
  
    if (firstBlock.dataset.memory === secondBlock.dataset.memory){
  
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
  
      firstBlock.classList.add('has-match');
      secondBlock.classList.add('has-match');
  
      document.getElementById('success').play();
  
    } else {
  
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
      setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
  
      }, duration);
      document.getElementById('fail').play();
    }
  }
  




