# mac 用户设置全局变量code
两种方式：

1.打开 VS Code，打开控制面板 （​​⇧⌘P​​​）,输入 ‘shell command’，在提示里看到 ​​Shell Command: Install 'code' command in PATH​​，运行它就可以了

2.使用命令:
```
  第一步：vim ​.bash_profile
  第二步按键盘i进入编辑状态
  第三部:export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/:/app/bin"
  如果有多个环境变量可以使用:分开，例如
  export PATH="\$PATH:path1:path2:path3
```



# window 用户设置全局变量code
### 配置：
1.打开 vscode

2.按 Ctrl + Shift + P
你会在输入框看到 > 不要删除它

3.在它后面接着敲 path

4.然后你可以找到一个选项叫
Shell Command: Install 'code' command in PATH 

5.鼠标点击它 或者 键盘选择中后按回车
### 校验：
在某一个文件夹下运行终端程序（命令行面板）
在命令行面板输入code .

# 使用
```
1. webpack 配置
引用 const  {devserver} = require('sy-link-code/index')
{
  ...config,
  start: {
    ...start.config,
    module: {
      rules: [{
        test: /\.vue$/,
        use: ['sy-link-code']
      }]
    },
    devServer: {
      ...devServer.config,
      ...devServer,
    }
  }
}

2. vue 入口文件.js
new CodeLink({
  type: 'vsCode或者webStorm',
  url: 'http://localhost:xxxx或者https://localhost:xxxx'
})


3. 按shift + click（选中的dom元素） 既可跳转对应的vscode 的vue 文件

   ps: 不需要打开F12点击dom ，只需要点击视图
```