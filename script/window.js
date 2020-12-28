var changeDifficulty = document.getElementsByClassName('changeDifficulty')[0],
  changeOperator = document.getElementsByClassName('changeOperator')[0],
  settings = document.getElementsByClassName('settings')[0],
  soundBtn = document.getElementsByClassName('soundOff')[0],
  difDis = document.querySelectorAll('#difficults button')
changeOperator.addEventListener(
  'click',
  function () {
    $('#operatorS').slideToggle(300)
    changeDifficulty.classList.toggle('hide')
    settings.classList.toggle('hide')
  },
  false,
)

changeDifficulty.addEventListener(
  'click',
  function () {
    $('#difficults').slideToggle(300)
    changeOperator.classList.toggle('hide')
    settings.classList.toggle('hide')
  },
  false,
)
settings.addEventListener(
  'click',
  function () {
    $('#setting').slideToggle(300)
    changeOperator.classList.toggle('hide')
    changeDifficulty.classList.toggle('hide')
  },
  false,
)

var hintModal = document.querySelector('.hintModal'),
  confirmBox = document.querySelector('.confirmBox'),
  btn = document.querySelectorAll('button'),
  offVibrate = document.querySelector('#offVibrate'),
  hintBtn = document.querySelector('.hintBtn'),
  yesBtn = document.querySelector('.yes'),
  noBtn = document.querySelector('.noBtn')

function show() {
  hintModal.classList.toggle('show')
  confirmBox.classList.toggle('show')
}
window.onclick = function (e) {
  if (e.target == hintModal) {
    show()
  }
}

hintBtn.addEventListener('click', show, false)
yesBtn.addEventListener('click', show, false)
noBtn.addEventListener('click', show, false)
soundBtn.addEventListener('click', offBtn, false)

for (let i = 0; i < difDis.length; i++) {
  activeDis(difDis[i])
}

function activeDis(btndis) {
  btndis.addEventListener('click', function () {
    var currentDis = document.querySelector('button[disabled=true]')
    currentDis.removeAttribute('disabled', 'false')
    this.setAttribute('disabled', true)
  })
}
const LOCAL_STORAGE_AUDIO_KEY = 'audio'
let audioFlag = localStorage.getItem(LOCAL_STORAGE_AUDIO_KEY) || 'true'
function offBtn() {
  soundBtn.classList.toggle('off')
  if (audioFlag == 'true') {
    audioEl.muted = true
    audioFlag = 'false'
  } else {
    audioEl.muted = false
    audioFlag = 'true'
  }
  save()
}
const LOCAL_STORAGE_VIBRATION_KEY = 'vibration'
const LOCAL_STORAGE_VIBRATE_KEY = 'vibrate'
var vibrateFlag = localStorage.getItem(LOCAL_STORAGE_VIBRATION_KEY) || 'true'
var vibration = localStorage.getItem(LOCAL_STORAGE_VIBRATE_KEY) || 'true'
function clickVib() {
  if (vibrateFlag === 'true') {
    navigator.vibrate(300)
  } else {
    navigator.vibrate(0)
  }
}
offVibrate.onclick = function () {
  vibrationJump()
  this.classList.toggle('off')
}
function vibrationJump() {
  if (vibration == 'true') {
    vibrateFlag = 'false'
    vibration = 'false'
  } else {
    vibrateFlag = 'true'
    vibration = 'true'
  }
  save()
}
btn.forEach((btns) => btns.addEventListener('click', clickVib))

howTo.addEventListener('click', howToBtn)

function howToBtn() {
  alert(' Think the possible answer of ' + problem.innerText)
  howToGuide()
  intervals = setInterval(howToGuide, 1000)
}

function howToGuide() {
  inputCont.style.border = 'none'
  document.body.style.pointerEvents = 'none'
  timeAnimate++
  //alert(" Think the possible answer of " + problem.innerText);
  if (timeAnimate == 1) {
    answer.focus()
    answer.style.transition = 'all .2s ease'
    answer.style.border = '3px solid red'
  } else if (timeAnimate === 2) {
    answer.value = 'Your answer '
  } else if (timeAnimate === 3) {
    answer.style.border = 'none'
    answer.value = 'Click Submit ->'
    submitBtn.focus()
    submitBtn.style.border = '3px solid red'
  } else if (timeAnimate === 5) {
    timeAnimate = 0
    submitBtn.style.border = 'none'
    answer.value = ''
    clearInterval(intervals)
    hintGuide()
  }
}

function hintGuide() {
  alert('And HINT? for clues of the answer')
  hintGuide2()
  intervals = setInterval(hintGuide2, 1000)
}

function hintGuide2() {
  timeAnimate++
  if (timeAnimate === 1) {
    hintBtn.focus()
    hintBtn.style.border = '5px solid red'
    hintModal.style.pointerEvents = 'none'
  } else if (timeAnimate === 2) {
    yesBtn.focus()
    hintBtn.style.border = '2px solid #c4ba6b'
    hintBtn.click()
  } else if (timeAnimate === 4) {
    hintModal.click()
  } else if (timeAnimate === 5) {
    hintModal.style.pointerEvents = 'auto'
    document.body.style.pointerEvents = 'auto'
    clearInterval(intervals)
    settings.focus()
    timeAnimate = 0
  }
}
function saveInRefresh() {
  money.innerHTML = moneys
  checkLeaderboard()
  if (vibrateFlag != 'true') {
    offVibrate.classList.toggle('off')
  }
  if (audioFlag != 'true') {
    soundBtn.classList.toggle('off')
    audioEl.muted = true
  }
}
function save() {
  localStorage.setItem(LOCAL_STORAGE_VIBRATION_KEY, vibrateFlag)
  localStorage.setItem(LOCAL_STORAGE_VIBRATE_KEY, vibration)
  localStorage.setItem(LOCAL_STORAGE_AUDIO_KEY, audioFlag)
}
