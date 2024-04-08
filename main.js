
//控制宽高
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 4

autoSetCanvasSize(yyy)


/************/
//控制鼠标事件
listenToUser(yyy)


/***************/
//控制橡皮擦是否开启

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    orange.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
orange.onclick = function () {
    context.strokeStyle = 'orange'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.add('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
yellow.onclick = function () {
    context.strokeStyle = 'yellow'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.add('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.add('active')
    yellow.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
cyan.onclick = function () {
    context.strokeStyle = 'cyan'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.add('active')
    blue.classList.remove('active')
    purple.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.add('active')
    purple.classList.remove('active')
}
purple.onclick = function () {
    context.strokeStyle = 'purple'
    black.classList.remove('active')
    red.classList.remove('active')
    orange.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
    green.classList.remove('active')
    cyan.classList.remove('active')
    blue.classList.remove('active')
    purple.classList.add('active')
}

thin.onclick = function () {
    lineWidth = 4
}

thick.onclick = function () {
    lineWidth = 8
}

clear1.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height)
}

download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    // console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'my canvas'
    a.target = '_blank'
    a.click()
}
/***************/
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {  //获取页面宽高
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1)  //起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)  //终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    // 特性监测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        canvas.ontouchstart = function (aaa) {
            /*console.log('开始摸我了')
            console.log(aaa)*/
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            //console.log(x, y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 15, 15)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                /*console.log(lastPoint)*/
                //drawCircle(x,y,1)
            }
        }

        canvas.ontouchmove = function (aaa) {
            /*console.log('边摸变动')*/
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {

                newPoint = {
                    "x": x,
                    "y": y
                }
                //drawCircle(x,y,1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //点连成线
            }
        }

        canvas.ontouchend = function () {
            //console.log('摸完了')
            using = false
        }
    } else {
        // 非触屏设备
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
                /*console.log(lastPoint)*/
                //drawCircle(x,y,1)
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {

                newPoint = {
                    "x": x,
                    "y": y
                }
                //drawCircle(x,y,1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //点连成线
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }


    }

}
