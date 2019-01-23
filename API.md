# 关于接口

从`Andriod`客户端上抓来的

    2019.01.22 葫芦侠版本号: 3.5.0.83.3

```bash
         -o          o-
          +hydNNNNdyh+
        +mMMMMMMMMMMMMm+
      `dMMm:NMMMMMMN:mMMd`
      hMMMMMMMMMMMMMMMMMMh
  ..  yyyyyyyyyyyyyyyyyyyy  ..
.mMMm`MMMMMMMMMMMMMMMMMMMM`mMMm.   D1Y@localhost
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:   -----------------
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:   OS: Android 8.0.0 arch64
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:   Host: HONOR
:MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM:   Kernel: 4.4.23+
-MMMM-MMMMMMMMMMMMMMMMMMMM-MMMM-   Memory: 2213MiB / 3788MiB
 +yy+ MMMMMMMMMMMMMMMMMMMM +yy+    
      mMMMMMMMMMMMMMMMMMMm         
      `/++MMMMh++hMMMM++/`         
          MMMMo  oMMMM             
          oNMm-  -mMNs             
```

接口地址: **<https://floor.huluxia.com>**

> 大部分请求都是`get`请求

### 通用参数

-   `platform`: `2`  # 参数位置,可能
-   `app_version`: `3.5.0.88.3` # 客户端版本号
-   `market_id`: `floor_web` # 未知
-   `versioncode`: `20141400`
-   `device_code`: `[w]24:1f:a0:c1:b2:26-[i]866946028523923-[s]89860037187574327489`
-   `_key`: 登录后获取到密匙,有的登录的地方需要用到

### 活动(不需要登录)

`GET http://floor.huluxia.com/activity/list/ANDROID/2.1`

**参数**

-   通用参数
-   `start` :: 偏移值,可能用来翻页
-   `count` :: 返回的数量(默认为20,20-100之间)

**test**

```bash
☁  ~  curl -G http://floor.huluxia.com/activity/list/ANDROID/2.1
{"msg":"","list":[{"id":134,"title":"【跨年活动】江湖路漫漫.。","picture_url":"http://cdn.u1.huluxia.com/g3/M02/72/25/wKgBOVwp-K2ACNOcAAH9ON0OB4U902.png",..}
```


### 用户登录状态(需要登录)
`GET http://floor.huluxia.com/user/status/ANDROID/2.1`

__参数__
- `_key`

### 退出登录

`GET http://floor.huluxia.com/user/exit/ANDROID/2.0`

### QQ登录
容我研究一下🧐

### 邮箱登录
`POST http://floor.huluxia.com/account/login/ANDRIOD/2.1`

__参数__
- `email` :: 邮箱
- `password` :: 密码,经过加密的,还不知道怎么解密

### 板块(需要登录)
`GET http://floor.huluxia.com/category/list/ANDROID/2.0`
- `_key`

### 用户信息(需要登录)
`GET http://floor.huluxia.com/user/info/ANDROID/2.1`
- `_key`

### 首页游戏推荐(不需要登录)
`GET http://tools.huluxia.com/bbs/recommend/ANDROID/3.6`

__参数__
- `start` :: 偏移值,用于分页
- `count` :: 分多少页面

__test__

```bash
☁  ~  curl -G http://tools.huluxia.com/bbs/recommend/ANDROID/3.6?count=30
```

## 搜索建议(不需要登录)
`GET http://tools.huluxia.com/search/suggest/ANDROID/3.6`

__参数__
- 通用参数

## 版本更新检测(不需要登录)
`GET http://version.huluxia.com/new/version/ANDROID/1.0`

__参数__
- 通用参数
- `app_version` : `3.5.0.88.3`
- `channel` : `floor_tencent`
- `app_name`:`com.huati`

## 用户主题背景(貌似不需要登录)
`GET http://floor.huluxia.com/glorify/used/new/ANDROID/2.2`

__参数__
- 通用参数

## 用户主题列表(需要登录)
`GET http://floor.huluxia.com/glorify/list/ANDROID/2.1`

__参数__
- 通用参数
- `_key`

## 帖子列表(不需要登录)
`GET http://floor.huluxia.com/post/list/ANDROID/2.1`

__参数__
- 通用参数
- `start` :: 偏移值
- `count` :: 每次返回多少
- `cat_id`:: 板块
- `tag_id`:: 为`cat_id`+`01,02,,,`,如不存在将返回全部

据我目前所知:

** cat_id **
- 84 :: 三楼精选
- 67 :: 头像签名
- 58 :: 恶搞
- 43 :: 实用软件
- 81 :: 手机美化
- 16 :: 玩机广场
- 44 :: 玩机教程
- 45 :: 原创技术
- 56 :: 美腿
- 96 :: 技术分身
- 76 :: 娱乐天地
- 3  :: 自拍
- 2  :: 泳池
- 1  :: 三楼公告板

** tag_id **

返回的是大板块下小版块
- 0    :: 返回全部
- cat_id+01
- cat_id+02
- cat_id+03
- cat_id+05 (一般可能是"全部")
- ....

__test__
```bash
☁  ~  curl http://floor.huluxia.com/post/list/ANDROID/2.1?cat_id=84
{"msg":"","posts":[{"postID":37204389,"title":"【地图建筑】[申精]合集开始","detail":"此帖申精，建议楼主模式[玫瑰]\n话不多说",
```

## 板块列表(不需要登录)
`GET http://floor.huluxia.com/category/forum/list/ANDROID/2.0`

__参数__
- 通用参数

__test__
```bash
☁  ~  curl http://floor.huluxia.com/category/forum/list/ANDROID/2.0
{"msg":"","categoryforum":[{"id":4,"icon":"http://cdn.huluxia.com/avatar/1/201404/22/8bc7a5bc8eae685d2faaff9c078ab75c.jpg","title":"角色扮演","status":1,"description":"天天炫斗、时空猎人","seq":1,"categorycount":4}
```
返回的`id`用来查询板块的

## 板块查询(不需要登录)
`GET http://floor.huluxia.com/category/forum/list/all/ANDROID/2.0`

__参数__

- 通用参数
- `fum_id` :: 需要传入的也就是上一个板块列表里`id`

## 空间背景(需要登录)
`GET http://floor.huluxia.com/space/list/ANDROID/2.1`

__参数__
- `_key`

## 帖子详情(不需要登录)
`GET http://floor.huluxia.com/post/detail/ANDROID/2.1`

__参数__

- 通用参数
- `post_id` :: 帖子`id`
- `page_size` :: 每次传多少
- `page_no` :: 用于分页

## 搜索帖子(需要登录)
`GET http://floor.huluxia.com/post/search/ANDROID/2.1`

__参数__

- 通用参数
- `_key` :: 需要登录
- `keywords` :: 搜索关键字
- `cat_id`   :: 搜索的板块
- `count`    :: 需要返回多少
- `flag`     :: 默认`0`,未知

## 搜索用户(需要登录)
`GET http://floor.huluxia.com/post/search/ANDROID/2.2`

__参数__

- 通用参数
- `_key` :: 需要登录
- `keywords` :: 搜索关键字
- `count`    :: 需要返回多少

## 签到(需要登录)
`GET http://floor.huluxia.com/user/signin/ANDROID/2.1`

__参数__

- 通用参数
- `_key` :: 登录
- `cat_id` :: 需要签到的板块

## 达人堂(不需要登录)
`GET http://floor.huluxia.com/daren/list/ANDROID/2.0`

__参数__

- 通用参数
- `cat_id` :: 需要查询的板块的`id`
- `count`  :: 返回多少
- `start`  :: 偏移值
