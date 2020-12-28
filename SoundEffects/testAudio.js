const aud = new Audio("wrongEffect.mp3")
aud.volume = 0
function playButton() {
	aud.play()
}
function pauseButton() {
	aud.pause()
	aud.currentTime = 0
}