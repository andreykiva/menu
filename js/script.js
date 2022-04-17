let level = 1;

const $scroll1 = document.querySelector(".scroll1"),
	$scroll2 = document.querySelector(".scroll2"),
	$scroll3 = document.querySelector(".scroll3"),
	$scroll4 = document.querySelector(".scroll4"),
	$scroll5 = document.querySelector(".scroll5"),
	$answerForm = document.querySelector(".answer-form"),
	$hideText = document.querySelector(".hide-text"),
	$outsideInput = document.querySelector(".outside-input");

const showNextScroll = (active, next) => {
	active.classList.remove("scroll-down");

	setTimeout(() => {
		active.classList.add("hide");
		next.classList.remove("hide");

		setTimeout(() => {
			next.classList.add("scroll-down");
			next.classList.remove("scroll-up");
		}, 100);
	}, 1000);
};

const chackAnswer = (el) => {
	if (level === 1) {
		el.classList.add("showGhost");
		setTimeout(() => {
			showNextScroll($scroll1, $scroll2);
			level++;
		}, 3000);
	} else if (level === 2) {
		if ($answerForm.value.toLowerCase() == "sage") {
			el.classList.add("showGhost");
			setTimeout(() => {
				showNextScroll($scroll2, $scroll3);
			}, 3000);
			level++;
		}
	} else if (level === 3) {
		if ($outsideInput.value.toLowerCase() == "baron") {
			el.classList.add("showGhost");
			setTimeout(() => {
				showNextScroll($scroll3, $scroll4);
			}, 3000);
			level++;
		}
	}
};

$answerForm.addEventListener("input", (e) => {
	if (e.target.value.toLowerCase() == "monocle") {
		$hideText.classList.add("showText");
	} else {
		$hideText.classList.remove("showText");
	}
});
