const leaderboards = document.getElementById('highestMoney')
let leaderboardScores = []
let nameArray = [
  'Gina',
  'Tommy',
  'Bon',
  'Jim',
  'Rode',
  'Jos',
  'Joce',
  'Tinay',
  'Hulo',
  'Solo',
  'Tina',
  'CrisTina',
]
const random1 = Math.floor(Math.random() * nameArray.length)
const random2 = Math.floor(Math.random() * nameArray.length)
function checkLeaderboard() {
  const moneyLess = Math.abs(moneys - 2)
  const moneyGreater = moneys + 15
  clearAllElement()
  const name_1 = nameArray[random1],
    name_2 = nameArray[random2],
    alName =
      nameArray[nameArray.indexOf(name_1) + 1] ||
      nameArray[nameArray.indexOf(name_1) - 1],
    name_2_alt = name_1 == name_2 ? alName : name_2

  var already = [
    {
      name: name_1,
      money: Math.floor(Math.random() * (moneyGreater - moneyLess)) + moneyLess,
    },
    {
      name: name_2_alt,
      money: Math.floor(Math.random() * (moneyGreater - moneyLess)) + moneyLess,
    },
    {
      name: 'You',
      money: moneys,
    },
  ]
  already.forEach((all) => {
    leaderboardScores.push(all)
  })
  leaderboardScores = leaderboardScores.sort((a, b) => b.money - a.money)
  leaderboardScores.forEach((score) => {
    leaderboards.innerHTML += `<li>${score.name} <span>${score.money}</span></li>`
  })
  const highscore_ = document.querySelectorAll('#highestMoney li')
  highscore_.forEach((all) => {
    if (/you/gi.test(all.innerText)) {
      all.classList.add('highlight')
    }
  })
}

setInterval(checkLeaderboard, 3000)
function clearAllElement() {
  leaderboards.innerHTML = null
  leaderboardScores = []
}

function saveAllScores() {
  localStorage.setItem(
    LOCAL_STORAGE_LEADERBOARD_KEY,
    JSON.stringify(leaderboardScores),
  )
}
const dragBoard = document.querySelector('.leaderBoard')
$('.leaderBoard').draggabilly({ containment: 'body' })
