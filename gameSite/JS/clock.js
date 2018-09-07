var size = 86;
var columns = Array.from(document.getElementsByClassName('column'));
var d = void 0,c = void 0;
var classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];

var c = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    c = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + (seconds > 9 ? seconds : "0" + seconds);
    columns.forEach(function (ele, i) {
        var n = +c[i];
		var offset = -n * size;
		ele.style.transform = 'translateY(calc(9vh + ' + offset + 'px - ' + size / 2 + 'px))';
		Array.from(ele.children).forEach(function (ele2, i2) {
			ele2.className = 'num ' + getClass(n, i2);
		});
	});
    console.log(c);
    timer();
}
function timer() {
    setTimeout(add, 1000);
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getClass(n, i2) {
	return classList.find(function (class_, classIndex) {return Math.abs(n - i2) === classIndex;}) || '';
}
timer();

