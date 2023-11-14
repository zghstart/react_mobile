function adapter(){
    // 获取布局视口宽度，因为开启了理想视口，布局视口=设备独立像素
    const dpiWidth = document.documentElement.clientWidth
    // 计算根字体大小
    const rootFontSize = dpiWidth/10
    // 设置根字体大小
    document.documentElement.style.fontSize = rootFontSize+'px'
}
adapter();
window.onresize = adapter

