const $key = document.querySelector(".js_key"),
	$timer = document.querySelector(".js_timer"),
	$letters = document.querySelectorAll(".js_letter");

const data = "Kings of da Street";
let letters = 0;
let sec = 60;

const intervalId = setInterval(() => {
	if (sec == 0) {
		$timer.textContent = "Lose";
		$timer.classList.add("lose");
		$key.classList.add("lose");

		clearTimeout(intervalId);
	} else {
		$timer.textContent = --sec;
	}
}, 1000);

$letters.forEach((letter) => {
	letter.addEventListener("click", () => {
		if (letter.classList.contains("show")) return;

		letter.classList.add("show");
		letters++;

		if (data[letters - 1] == " ") {
			letters++;
		}

		$key.textContent = data.slice(0, letters);

		if (letters === data.length) {
			$timer.textContent = "Win";
			$timer.classList.add("win");
			$key.classList.add("win");

			clearTimeout(intervalId);
		}
	});
});
