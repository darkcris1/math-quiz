var submitBtn = document.querySelector('.submitBtn'),
  problem = document.querySelector('.problem'),
  moneyCont = document.querySelector('.moneyCont'),
  howTo = document.querySelector('.howTo'),
  inputCont = document.querySelector('.inputCont'),
  operand = document.querySelector('.operand'),
  easyBtn = document.querySelector('.easy'),
  medium = document.querySelector('.medium'),
  yesBtn = document.querySelector('.yes'),
  answer = document.querySelector('#answer'),
  hard = document.querySelector('.hard'),
  num1 = document.querySelector('.num2'),
  num2 = document.querySelector('.num1'),
  money = document.querySelector('.money'),
  audioEl = document.getElementsByTagName('AUDIO')[0],
  dif = { a: 'e', b: 'm', c: 'h' },
  operator = {
    plus: '+',
    min: '-',
    mult: '×',
    divide: '÷',
  },
  eMon = { e: 1, m: 3, h: 7 },
  sounds = {
    correctSound: './SoundEffects/correctAnswer.ogg',
    wrongSound: './SoundEffects/wrongEffect.mp3',
  },
  LOCAL_STORAGE_MONEY_KEY = 'money',
  timeAnimate = 0
moneys = parseInt(localStorage.getItem(LOCAL_STORAGE_MONEY_KEY)) || 0

function failed() {
  timeAnimate++
  if (timeAnimate <= 1) {
    intervals = setInterval(failed, 600)
    inputCont.style.animation = 'shake .5s ease'
    inputCont.style.boxShadow = '0px 0 5px 1px red'
  } else {
    timeAnimate = 0
    inputCont.style.boxShadow = '0px 0 3px 1px rgba(0,0,0,.6)'
    inputCont.style.animation = 'none'
    clearInterval(intervals)
  }
}
function indicate(numbers) {
  const span = document.createElement('span')
  span.className = 'indicator'
  span.innerText = numbers
  if (/-/g.test(numbers)) {
    span.style.color = '#ff9f9f'
  }
  moneyCont.appendChild(span)
  setTimeout(function () {
    moneyCont.removeChild(document.querySelector('.indicator'))
  }, 1000)
}
function submit(identify) {
  var reg1 = /×/,
    reg2 = /÷/,
    probs = problem.innerText
  if (reg1.test(probs)) {
    probs = probs.replace(/[×]/g, '*')
  } else if (reg2.test(probs)) {
    probs = probs.replace(/[÷]/g, '/')
  }

  solution = eval(probs)
  if (answer.value == '') return
  switch (identify) {
    case 'e':
      difficultyRandom(1, 10, 'a')
      break
    case 'm':
      difficultyRandom(10, 99, 'b')
      break
    case 'h':
      difficultyRandom(100, 999, 'c')
      break
  }
  if (answer.value == solution) {
    moneys += eMon[identify]
    money.innerHTML = moneys
    indicate(`+${eMon[identify]}`)
    sound(sounds.correctSound)
    localStorage.setItem(LOCAL_STORAGE_MONEY_KEY, moneys)
  } else {
    if (moneys > 0) {
      moneys -= eMon[identify]
      indicate(`-${eMon[identify]}`)
    }
    money.innerHTML = moneys
    sound(sounds.wrongSound)
    inputCont.style.borderColor = 'red'
    failed()
    localStorage.setItem(LOCAL_STORAGE_MONEY_KEY, moneys)
  }
  answer.value = ''
  answer.focus()
  checkLeaderboard()
}

function difficultyRandom(min, max, sel) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  const random2 = Math.floor(Math.random() * (max - min + 1)) + min
  num1.innerHTML = random
  num2.innerHTML = random2
  submitBtn.setAttribute('onclick', "submit('" + dif[sel] + "')")
}

function oper(obj) {
  operand.innerHTML = operator[obj]
}
function hintShow() {
  const solution = eval(problem.textContent)
  const solution2 = solution.toString()
  const firsDigit = solution.toString().charAt(0)
  const twoDigits = solution2.charAt(0) + solution2.charAt(1)
  const threeDigits = solution2[0] + solution2[1] + solution2[2]
  if (moneys >= 20) {
    if (solution2.length > 3) {
      answer.value = threeDigits
    } else if (solution2.length > 2) {
      answer.value = twoDigits
    } else if (solution2.length == 2) {
      answer.value = firsDigit
    } else if (solution < 5) {
      alert('The answer is between 0-4')
    } else if (solution < 10) {
      alert('The answer is between 5-9 ')
    }
    moneys -= 20
    money.innerHTML = moneys
  } else {
    alert('Not Enough Money')
  }
}

function sound(src) {
  audioEl.src = src
  audioEl.currentTime = 1.3
  audioEl.play()
}

window.onload = function () {
  difficultyRandom(1, 10, 'a')
  saveInRefresh()
}

window.addEventListener('keydown', (e) => {
  if (e.which === 13) submitBtn.click()
})
