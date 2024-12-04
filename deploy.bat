
chcp 65001
echo 开始打包..
::npm 打包
call npm run build
echo 打包完成
echo 进入构建文件夹
cd dist

echo 初始化Git 仓库
git init
git config user.name "a-xcm"
git config user.email "a-xcm.com"
git checkout -b main
git add -A
git commit -m 'deploy'

echo 推送到GitHub
git push -f https://github.com/a-xcm/a-xcm.github.io.git main

echo 完成
::pause
echo 退出脚本
pause