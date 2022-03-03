(function(){
	"use strict";
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const CLOCK_ORIGIN = canvas.width/2;
	let clock = {

	
		tick: Math.PI/6/5,
		radius: (canvas.width / 2) - 25,
		sec: 0,
		min: 0,
		hour: 0,
		get secAngle() {
			return this.sec * this.tick;
			
			
		},
		get minAngle() {
			return (this.min * this.tick) + (this.sec * this.tick / 60);
		},
		
		
		get hourAngle() {
			return (this.hour * 5 * this.tick) + (5 * this.tick * this.min / 60);
		}
	}

	
	
	
	setInterval(function()
		    {
			clearClock();
			drawClock();
	}, 1000);

	
	
	
	function drawClock() {
		drawClockFace();
		updateClockTime();
		drawSecondHand();
		drawMinuteHand();
		drawHourHand();
	}
	
	
	
	function drawClockFace() {
		drawClockBorder();
		drawClockTickmarks();
		drawClockNumbers();
	}
	
	function clearClock() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawClockFace();
	}
	
	function drawClockBorder() {
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(CLOCK_ORIGIN, CLOCK_ORIGIN, clock.radius, 0, 2*Math.PI);
		ctx.stroke();
	}
	
	function drawClockTickmarks() {
		//draw 6 tickmark lines that pass through the origin
		for (let i=0, j=6; i <= 5; i++, j++) {
			ctx.beginPath();
			ctx.moveTo(
				CLOCK_ORIGIN + clock.radius * Math.cos(Math.PI/6*i),
				CLOCK_ORIGIN - clock.radius * Math.sin(Math.PI/6*i)
			);
			ctx.lineTo(
				CLOCK_ORIGIN + clock.radius * Math.cos(Math.PI/6*j),
				CLOCK_ORIGIN - clock.radius * Math.sin(Math.PI/6*j)
			);
			ctx.stroke();
		}		
		//draw a big white circle over the tickmark lines to make them look like tickmarks
		ctx.beginPath();
		ctx.arc(CLOCK_ORIGIN, CLOCK_ORIGIN, clock.radius-10, 0, 2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	
	
	function drawClockNumbers() {
		ctx.font = '30px Arial';
		ctx.fillStyle = "#999";
		for (let i=0, hand=15; i <= 11; i++, hand--) {
			if (hand >= 10 && hand <= 12) {
				ctx.fillText(
					(hand % 12) ? hand % 12 : "12",
					CLOCK_ORIGIN+(clock.radius-30)*Math.cos(Math.PI/6*i)-15,
					CLOCK_ORIGIN-(clock.radius-30)*Math.sin(Math.PI/6*i)+10
				);
			} else {
				ctx.fillText(
					hand % 12,
					CLOCK_ORIGIN+(clock.radius-25)*Math.cos(Math.PI/6*i)-8,
					CLOCK_ORIGIN-(clock.radius-25)*Math.sin(Math.PI/6*i)+10
				);
			}
		}
	}
	
	function updateClockTime() {
		const d = new Date();
		clock.sec = d.getSeconds();
		clock.min = d.getMinutes();
		clock.hour = d.getHours();
	}
	
	
	function drawSecondHand() {
		ctx.lineWidth = 1;
		drawLineAngle(clock.radius*0.85, clock.secAngle);
	}
	
	
	function drawMinuteHand() {
		ctx.lineWidth = 3;
		drawLineAngle(clock.radius*0.8, clock.minAngle);
	}
	
	
	function drawHourHand() {
		ctx.lineWidth = 7;
		drawLineAngle(clock.radius*0.4, clock.hourAngle);
	}

	function drawLineAngle(length, angle) {
		const destX = -length*Math.cos(angle+Math.PI/2);
		const destY = length*Math.sin(angle+Math.PI/2);
		drawFromOrigin(destX, destY);
	}
	
	function drawFromOrigin(x, y) {
		const destX = CLOCK_ORIGIN + x;
		const destY = CLOCK_ORIGIN - y;
		ctx.beginPath();
		ctx.moveTo(CLOCK_ORIGIN, CLOCK_ORIGIN);
		ctx.lineTo(destX, destY);
		ctx.stroke();
	}

})();
