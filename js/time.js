(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
			t = h >= 12 ? 'PM' : 'AM';
			h = h > 12 ? h-12 : (h == 0) ? 12 : h;
        document.getElementById('time').innerHTML = h + ":" + m + ' ' + t;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})();