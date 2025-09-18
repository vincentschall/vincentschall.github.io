// split the header
const split = SplitText.create("h1", {
	type:"chars", 
	mask:"chars"
})

// animate the header
const tween = gsap.from(split.chars, {
	yPercent: 100,
	stagger: 0.1
})

GSDevTools.create({animation:tween})
