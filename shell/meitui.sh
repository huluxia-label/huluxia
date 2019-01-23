#!/usr/bin/env bash
echo -e "\033[32;49;1m葫芦侠图片下载工具\033[39;49;0m"
echo -e "-- \033[33;31;1m→ 传一个参数下载指定板块 →\033[39;49;0m --
1 ── 三楼公告牌
2 ── 泳池🌚
3 ── 自拍😝
56 ─ 美腿
58 ─ 恶搞
67 ─ 头像签名
76 ─ 娱乐天地
-----------------------"
cat_id=56
read -p '=> 输入序列: '
case $REPLY in
  1)
    cat_id=1
    ;;
  2)
    cat_id=2
    ;;
  3)
    cat_id=3
    ;;
  56)
    cat_id=56
    ;;
  58)
    cat_id=58
    ;;
  67)
    cat_id=67
    ;;
  76)
    cat_id=76
esac
count=$1
# 帖子列表
post_list_url='http://floor.huluxia.com/post/list/ANDROID/2.1'
url="${post_list_url}?cat_id=${cat_id}&count=${count}&start=${start}"
down=$(curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36" ${url})
echo $down | jq -r . > .mt.json
mkdir meizi
cd meizi
for (( i = 0; i < 99; i++ )); do
  li=$(jq .posts[${i}] ../.mt.json)
  post_title=$(echo $li | jq -r '.title')
  post_images=$(echo $li | jq '.images | length')
  mkdir $post_title
  printf "开始下载: %s 标题为: 👉  %s \n" $i $post_title
  printf '标题: %s \n' ${post_title} > ${post_title}/${post_title}.md
  printf '介绍: %s \n' $(echo $li | jq ".detail") >> ${post_title}/${post_title}.md
  printf '帖子ID: %s \n' $(echo $li | jq ".postID") >> ${post_title}/${post_title}.md
  printf '用户ID: %s \n' $(echo $li | jq ".user.userID") >> ${post_title}/${post_title}.md
  printf '用户昵称: %s \n' $(echo $li | jq ".user.nick") >> ${post_title}/${post_title}.md
  printf '评论总数: %s \n' $(echo $li | jq ".commentCount") >> ${post_title}/${post_title}.md
  printf '创建时间: %s \n' $(echo $li | jq ".createTime") >> ${post_title}/${post_title}.md
  wget -O $post_title/$(echo $li | jq -r .user.nick).jpg $(echo $li | jq -r .user.avatar)
  if test $post_images -eq 1
  then
    wget -O $post_title/$(echo $li | jq -r .user.nick)_${i}.jpg $(echo $li | jq -r .images[0])
  elif test $post_images -ge 1
  then
    for (( bb = 0; bb < ${post_images}; bb++ )); do
      wget -O ${post_title}/$(echo $li | jq -r .user.nick)_${bb}.jpg $(echo $li | jq  -r .images[${bb}])
    done
  else
    echo "貌似是没有预览图诶~~"
  fi
done
