const path = require('path')
const ICONS_FOLDER = path.resolve(__dirname, 'src/icons')

module.exports = {
    publicPath: '/best-practice',

    devServer: {
        port: 9900,
    },

    // 自定义 webpack 配置
    // configureWebpack: {
    //     // 自定义全局别名 例如：@ =》 /src
    //     resolve: {
    //         alias: {
    //             package: path.join(__dirname, 'src/packagse')
    //         }
    //     },
    //     name: 'Vue 最佳实战开发'
    // }

    // 函数式配置 传入config 将来和webpack合并
    configureWebpack(config) {
        config.resolve.alias.package = path.join(__dirname, 'src/packagse');
        config.resolve.alias.comp = path.join(__dirname, 'src/components');

        //process.env.NODE_ENV 当前运行模式 有3钟模式
        // development = 开发
        // production = 生产环境
        // test = 测试环境
        if (process.env.NODE_ENV === 'development') {
            config.name =  'Vue 最佳实战开发 开发环境'
        }

        else {
            config.name =  'Vue 最佳实战开发 线上环境'
        }
    },

    // 高级配置 chain Webpack
    // 案例：开发中SVG处理
    // 往常开发出来svg会网上下载下来，为了处理兼容性每次都需要打包，生成好几个不同的字体文件，不同浏览器输出不同字体文件
    // 问题： 如何svg需要改变，又要需要重新下载打包 在放到项目里。变得繁琐不方便

    //解决方案1： svg-sprite-loader 组件 安装:npm i svg-sprite-loader -D
    // vue-cli-service 主要作用就是帮你把svg打包打一个矢量图库里，每一个svg就是会里面多加一个id为他名称的资源，并且会放在网页顶部
    // 在配置规则时候 可以使用 vue inspect --rule [svg] 规则名

    //方案2:  用线上 的http资源直接饮用
    chainWebpack(config) {
        // 配置svg规则
        // 1. 默认svg的规则不会碰他，得排除 让其他svg规则排除的自己定义目录下svg处理
        config.module.rule('svg')
            .exclude.add(ICONS_FOLDER) //ICONS_FOLDER =》 icon目录

        // 2 新增追加 icon规则 只包含我自己的icons目录4
        config.module.rule('icons')
            .test(/\.svg$/) // 自定义规则
            .include.add(ICONS_FOLDER).end() // 指定目录 如果没有加end()会报错.这当前事例已经进入add数组去，取消退回来
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]'})
    }

}
