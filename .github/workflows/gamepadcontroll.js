// ==UserScript==
// @name         手柄控制网页
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  支持摇杆查阅网页(上下左右),LB/RB翻页的功能需要自己去适配
// @author       zgc
// @include     http*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=acfun.cn
// @grant        none
// ==/UserScript==
/* eslint-disable no-restricted-globals */
function addEventListenerForGamePad() {
    let callBack = () => {
        let pads = navigator.getGamepads();
        pads.forEach(pad => {
            if (pad) {
                let [lsX, lsY, rsX, rsY] = pad.axes; // 左右摇杆的XY,取值为-1到1
                let speedy = Math.abs(lsY) > Math.abs(rsY) ? lsY : rsY;
                let speedx = Math.abs(lsX) > Math.abs(rsX) ? lsX : rsX;
                if (Math.abs(speedx) < 0.5) speedx = 0;
                if (Math.abs(speedy) < 0.1) speedy = 0;
                scrollBy(10 * speedx, 100 * speedy)

                let [, , , , LB, RB] = pad.buttons;
                if (LB.pressed)
                    postPage()
                else if (RB.pressed)
                    nextPage()
                console.log(LB.pressed, RB.pressed)
            }
        })
    };
    setInterval(callBack, 30)
}


// 上一页(LB)
function postPage() {
    if (location.href.includes("manhuagui"))
        document.dispatchEvent(new KeyboardEvent("keydown", {
            key: "z",
            target: document,
            bubbles: true,
            keyCode: 90
        }))
}

// 下一页(RB)
function nextPage() {
    if (location.href.includes("manhuagui"))
        document.dispatchEvent(new KeyboardEvent("keydown", {
            key: "z",
            keyCode: 88,
            target: document,
            bubbles: true
        }))
}
(function () {
    'use strict';
    addEventListenerForGamePad();
    // Your code here...
})();
