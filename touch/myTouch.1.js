/*
 * @Author: me
 * @Date: 2018-12-29 14:15:55 
 * @Last Modified by: me
 * @Last Modified time: 2018-12-29 14:52:06
 */

// 封装tap事件：  替代click事件
// click  300ms延时
// 第一个条件  触发的时长  不超过  150ms
// 第二个条件  不能移动 位置保持一致

// 单例模式  低级模式    高级单例模式  闭包

var myTouch = (function() {
    function tap(el, callback) {
        var startTime = 0,
            isMOve = false; //假设 没有移动
        el.addEventListener('touchstart', function() {
            startTime = new Date() * 1
        })
        el.addEventListener('touchmove', function() {
            isMOve = true;
        })
        el.addEventListener('touchend', function() {
            if (new Date() * 1 - startTime < 150 && !isMOve) {
                callback && callback()
            }
            //    清除记录过的状态
            isMOve = false;
        })
    }

    function swiper(el, direction, callback) {
        var startPoint = null,
            endPoint = null,
            distance = 30;
        el.addEventListener('touchstart', function(e) {
            var ev = e.touches[0];
            startPoint = {
                x: ev.clientX,
                y: ev.clientY
            }
        })
        el.addEventListener('touchmove', function(e) {
            var ev = e.touches[0];
            if (startPoint) {
                endPoint = {
                    x: ev.clientX,
                    y: ev.clientY
                }
            }
        })
        el.addEventListener('touchend', function() {
            if (startPoint && endPoint && dire(startPoint, endPoint) === direction) {
                callback && callback()
            }
            clearSwiper()
        })

        function clearSwiper() {
            startPoint = null;
            endPoint = null;
        }

        function dire(start, end) {
            var diffx = start.x - end.x, //x轴差值
                diffy = start.y - end.y,
                abX = Math.abs(diffx),
                abY = Math.abs(diffy),
                dire = '';
            if (abX > distance || abY > distance) { //保证滑动
                if (abX > abY) { //左右滑动
                    dire = diffx > 0 ? "swiperLeft" : "swiperRight";
                } else { //上下滑动
                    dire = diffy > 0 ? "swiperUp" : "swiperDown";
                }
            }
            return dire;

        }
    }


    return {
        tap,
        swiper
    }
})()











// 高级单例模式  对象  函数 闭包
// var myTouch = (function () {
//     //150ms之内 轻触  不能移动
//     var isMove = false, //判断手指是否移动
//         startTime = 0; //初始时间
//     function tap(el, callback) {
//         if (typeof el === 'object') {
//             el.addEventListener('touchstart', function () {
//                 startTime = new Date() * 1
//             })
//             el.addEventListener('touchmove', function () {
//                 isMove = true;
//             })
//             el.addEventListener('touchend', function () {
//                 if (new Date() * 1 - startTime < 150 && !isMove) {
//                     callback && callback()
//                 }
//             })
//         }

//     }
//     function swiper(el, direction, callback) {
//         var startPoint = null,
//             endPoint = null,
//             distance = 30;
//         if (typeof el === 'object') {
//             el.addEventListener('touchstart', function (e) {
//                 var ev = e.touches[0];
//                 //手指触摸屏幕的时候 记录开始的坐标信息
//                 startPoint = {
//                     x: ev.clientX,
//                     y: ev.clientY
//                 }
//             })
//             el.addEventListener('touchmove', function (e) {
//                 var ev = e.touches[0];
//                 if (startPoint) {
//                     //手指触摸屏幕的时候 记录结束的坐标信息
//                     endPoint = {
//                         x: ev.clientX,
//                         y: ev.clientY
//                     }
//                 }
//             })
//             el.addEventListener('touchend', function () {
//                 //dire函数执行的结果 方向 和 我们传递进来的额参数 进行判断
//                 if (startPoint && endPoint && dire(startPoint, endPoint) === direction) {
//                     // 如果方向相等 则执行接下来的指令
//                     callback && callback()
//                 }
//                 clearSwiper()
//             })

//             function dire(start, end) {
//                 var diffX = start.x - end.x,
//                     diffY = start.y - end.y,
//                     absX = Math.abs(diffX),
//                     absY = Math.abs(diffY),
//                     dire = '';
//                 if (absX > distance || absY > distance) {
//                     if (absX > absY) {
//                         dire = diffX > 0 ? 'swiperLeft' : 'swiperRight';
//                     } else {
//                         dire = diffY > 0 ? 'swiperUp' : 'swiperDown';
//                     }
//                 }
//                 return dire;
//             }

//             function clearSwiper() {
//                 startPoint = null;
//                 endPoint = null;
//             }
//         }
//     }
//     return {
//         tap, //tap:tap
//         swiper
//     }
// })()