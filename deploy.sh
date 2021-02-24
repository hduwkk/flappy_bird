#!/bin/bash

# echo '按下 <CTRL-D> 退出'
# echo -n '输入你最喜欢的网站名: '
# while read FILM
# do
#     echo "是的！$FILM 是一个好网站"
# done

# read name
# echo "是滴！$name 是一个好网站"

echo "请输入您的用户名"

read user

echo "请输入远程服务器密码"
echo "按下 <CTRL-D> 退出"

scp -r dist/. $user@115.159.86.57:~/workspace/codes/flappy_bird
