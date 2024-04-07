//控制宽高
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)


/************/
//控制鼠标事件
listenToUser(yyy)


/***************/
//控制橡皮擦是否开启

var eraserEnabled = false
eraser.onclick = function () { //橡皮擦被点击说明换成了画笔
    /*eraserEnabled = !eraserEnabled
    if(eraserEnabled){
        eraser.textContent = '画笔'
     }else{
        eraser.textContent = '橡皮擦'
     }//尽量让一个按钮只做一件事情，这样bug少*/
    eraserEnabled = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
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
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)  //起点
    context.lineWidth = 4
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
            console.log(x,y)
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

        canvas.ontouchmove = function (aaa) {
            console.log('边摸变动')
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
            console.log('摸完了')
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
