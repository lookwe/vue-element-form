# Vue 实战开发中常用硬核功能

开发经验也算是衡量一和程序员的标准，甚至找工作也被定为门槛。如何获得经验，这就是需要大量的实战开发中所得。包括功能需求，遇坑解决，技术栈扩展，思维提升等等...

> 适合经验缺乏，遇到需求不知道咋办小白学习和参考。【可恶啊，头发还有那么多】

## 目录

* [功能需求]
* [遇坑解决]
* [技术栈扩展]
* [思维提升]

## 功能需求

1. [配置全局路径别名](#配置全局路径别名)
1. [高级封装组件](#高级封装组件)
1. [动态权限路由](#动态权限路由)
1. [按钮权限控制](#按钮权限控制)
1. [Vue单元测试](#Vue单元测试)
1. [动态导航菜单](#动态导航菜单)
1. [请求服务器封装](#请求服务器封装)
1. [webpack配置全局svg组件](#配置全局svg组件)
1. [开发中环境配置策略](#开发中环境配置策略)
1. [模拟数据Mock](#模拟数据Mock)
1. [请求代理跨域](#请求代理跨域)


### 配置全局路径别名

* **对应的需求**： 当我们文件慢慢变大。特么是在模块化下。需要定义很多文件夹，按逻辑划分模块。每个模块下又出现很多文件。我们使用的时候需要  `import` 功能路径导出使用，可是文件路径很深怎么办，感觉很浪费代码量和心思。

* **解决方案**： 使用 **webpack** 定义别名完成公共常用的路径收取处理， 存在一个变量里。例如：vue-cli提供的@别名，=》 './src'路径。代码实现：在vue-config.js文件配置

  ```javascript
  const path = reqire("path");
  module.exports = {
  	// 配置最终和webpack合并
  	configureWebpack(config) {      
  		// 定义别名 comp 指定为 src/components 目录
          config.resolve.alias.comp = path.join(__dirname, 'src/components');
      }
  }
  ```


### 高级封装组件

* 这里模仿ElementUI源码。实现封装自定义组件主要用于进阶vue 更深层巩固Vue通信基站。封装ElementUI组件之一表单组件
1. **`el-input`** 简单的原生input数据双绑定组件 使用$arrt  $lister 高级属性
2. **`el-form-item`** 使用开发常用表达表单验证
3. **`el-form`** 表单组件提交及总总时间路线

### 动态权限路由

* **对应的需求**：权限类型相关，隐私保密页面的控制和保护、让无相关人员无法访问

* **实现思路**：前端路由分2个模块。一个公共模块任何人都可以访问，如：登录注册也，另一个是权限保护路由模糊

  1. 划分受保护路由，并给路由指定原数据 `mate` 角色

     ```javascript
     {
         path: "/about",
         component: () =>
             import(/* webpackChunkName: "home" */ "@/views/compose/About.vue"),
         name: "about",
         meta: {
             title: "About",
             icon: "denglong",
             roles: ['ordinary','admin'] // 规定那些角色可看
         },
     }
     ```

  2. 定义全局路由守卫。判断当前用户信息，token 和 角色。已经他是否去往报名单。

  3. 如何token没有则 去往登录页，| 有则取出用户角色 和 保护路中的 **`meta`** 对指定的角色判断。有则取出存放新的路由数组。

  4. 通过循环遍历后得到新的路由数组 并动态添加到 router对象上。使用 `router.addRoute([...])` 即可，next({...to})

* **后端存储动态路由方案**

  如果后端存路由的话，那我们请求登录。即可后端提供可访问路由器数组。原理一样。只不过前端不需要用户角色去判断过滤了，这部有后端直接数据库匹配查询返回我们当前角色的路由。

  * **有坑**：不过这种情况下需要注意的，后端返回是JSON对象。那我们路由中：component: import()=>{} 就会变成 `component: “import()=>{} ”` 这种显然前端无法识别路由配置，所以我们需要定义一个 组件映射后端数据的表

    ```javascript
    // 前端组件名和组件映射表
    const map = {
    //xx: require('@/views/xx.vue').default // 同步的⽅式
        xx: () => import('@/views/xx.vue') // 异步的⽅式
    }
    // 服务端返回的asyncRoutes
    const asyncRoutes = [
        { path: '/xx', component: 'xx',... }
    ]
    // 遍历asyncRoutes，将component替换为map[component]
    function mapComponent(asyncRoutes) {
        asyncRoutes.forEach(route => {
            route.component = map[route.component];
            if(route.children) {
                route.children.map(child => mapComponent(child))
            }
        })
    }
    // 动态添加新路由
    $router.addRoutes(mapComponent(asyncRoutes))
    ```

  * 然后循环遍历把字符串，换成正在可以执行的路由配置对象。并动态添加到路由器中。
  
### 按钮权限控制

* **对应需求**：权限颗粒化 某个页面肯能涉及很多操作，比如点击某个按钮执行相关操作。功能复杂时候一个页面会出现N多个按钮，并且对应用户角色能看到的按钮还要做处理，比如：批量删除按钮，一般用于权限大的用户设定
* **实现思路**：最常见的，可能小白多少都会使用 ``v-if`` 控制解决吧。可是这样的缺点: 不够灵感，不方便维护。如果后端角色字段发生变更，你可能想有打死后端那个人的冲动。
* **解决方案**：注册全局指令
  ```javascript
    Vue.directive("permission", {
        // 元素插入时候出发 binding 用户使用指令传来的相关参数
        inserted(el, binding) {
            // 获取指令的值：按钮要求的角色数组  取出结构赋值 定义别名pRoles接收
            const { value:pRoles } = binding;
    
            // 获取用户角色
            const roles = store.getters && store.getters.roles;
    
            if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
                // 判断用户角色中是否有按钮要求的角色
                const hasPermission = roles.some(role => {
                    return pRoles.includes(role);
                });
    
                // 如果没有权限则删除当前dom
                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el);
                }
            } else {
                throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`);
            }
        }
    });
  ````
  页面中使用：`<button v-permission="['admin']">批量删除</button>`

### Vue单元测试

 * **对应需求**：程序员除了编码能力，测试能力也是要必须的。如果不想被项管骂得惨，那么调试不能少
 * **实现思路**：

### 动态导航菜单


### 请求服务器封装


### 配置全局svg组件

* **对应的需求**：当我们SVG越来越多。且还方便管理，使用也非常繁琐，比如,去阿里云图库找，还需要打包出来。还要做对应处理，显得非常吃力。

* **解决方案**： 利用vuecli嵌入的webpack。给他加一个svg文件处理的 `loader`。然后动态加载他们，并定义个vue组件。组件控制他的样式，大小，布局等。提前你需要svg存放在 `icon/svg` 文件目录下

  安装处理svg插件

  ```
  npm i svg-sprite-loader -D
  ```

  vue.config.js中配置。

  ```javascript
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
  
  // 配置成功后可以执行 vue inspct --rule [规则名]  查看是否成功
  ```

  icon目录下创建index.js 。并在main.js引入；

  ```javascript
  import Vue from 'vue'
  import SvgIcon from 'comp/SvgIcon.vue'
  
  // 让vue 动态自动加载  获取一个 /svg目录 为上下文 获取所有 .svg 文件
  const req = require.context('./svg', false, /\.svg$/);
  
  //获取当前目录中所有文件名 并让req函数加载他们
  req.keys().map(req);
  
  // vue 注册组件
  Vue.component('svg-icon', SvgIcon);
  ```

### 开发中环境配置策略
  
  
### 模拟数据Mock  


### 请求代理跨域


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

