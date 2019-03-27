import Taro from '@tarojs/taro'

const NAVIGATOR_HEIGHT = 44
const TAB_BAR_HEIGHT = 50

export function getWindowHeight(showTabBar = true) {
    const info = Taro.getSystemInfoSync()
    const { windowHeight, statusBarHeight, titleBarHeight } = info
    const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0

    if (process.env.TARO_ENV === 'rn') {
        return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
    }

    if (process.env.TARO_ENV === 'h5') {
        return `${windowHeight - tabBarHeight}px`
    }

    if (process.env.TARO_ENV === 'alipay') {
        // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
        return `${windowHeight - statusBarHeight - titleBarHeight + (showTabBar ? 0 : TAB_BAR_HEIGHT)}px`
    }

    return `${windowHeight}px`
}