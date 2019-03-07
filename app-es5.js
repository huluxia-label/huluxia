'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var uilt = {
  makeElement: function makeElement(wrap, type) {
    var ele = document.createElement(wrap);
    if (_typeof({}) === (typeof type === 'undefined' ? 'undefined' : _typeof(type))) {
      if (type.className) {
        if (Array.isArray(type.className)) {
          type.className.forEach(function (element) {
            ele.className += element + ' ';
          });
        } else if (typeof type.className == 'string') {
          ele.className = type.className;
        }
      }
      if (type.id) ele.id = type.id;
      if (type.target) ele.target = type.target;
      if (type.title) ele.title = type.title;
      if (type.href) ele.href = type.href;
      if (type.src) ele.src = type.src;
      if (type.html) {
        var html = document.createTextNode(type.html);
        ele.appendChild(html);
      }
    } else if (typeof type == 'string') {
      var text = document.createTextNode(type);
      ele.appendChild(text);
    }
    return ele;
  },
  ajax: function ajax(tools) {
    var loading = document.getElementById('loading');
    loading.classList.add('table');
    var xhr = new XMLHttpRequest() || new ActiveXObject(),
        method = tools.method.toLocaleUpperCase() || 'GET',
        url = tools.url,
        endData = "";
    if (tools.data) {
      var data = tools.data;
      for (var i in data) {
        endData += i + '=' + data[i] + '&';
      }
      endData = '?' + endData.slice(0, endData.length - 1);
      url += endData;
    }
    xhr.onreadystatechange = function () {
      var isJSON = tools.JSON;
      if (xhr.readyState == 4 && xhr.status == 200) {
        loading.classList.add('none');
        loading.classList.remove('table');
        if (isJSON) {
          tools.success(JSON.parse(xhr.response));
        } else {
          tools.success(xhr.response);
        }
      } else {
        if (tools.before) tools.before();
      }
    };
    xhr.open(method, url);
    xhr.send();
  },
  fetch: function (_fetch) {
    function fetch(_x) {
      return _fetch.apply(this, arguments);
    }

    fetch.toString = function () {
      return _fetch.toString();
    };

    return fetch;
  }(function (api) {
    fetch(api.url).then(function (r) {
      return r.json();
    }).then(function (data) {
      return api.back(data);
    });
  }),
  query: function query(sele) {
    if (typeof sele == 'string') {
      if (sele.indexOf('.') == 0) {
        return document.querySelector(sele.slice(1));
      } else if (sele.indexOf('#') == 0) {
        return document.getElementById(sele.slice(1));
      } else {
        return document.getElementsByTagName(sele);
      }
    }
  },
  tools: function tools(ele, av) {
    av.html ? ele.innerHTML = av.html : ele.innerHTML = '';
  }
};
(function () {
  var $ = uilt.query,
      makeElement = uilt.makeElement,
      fixedWrap = makeElement('div', {
    className: ['fixed', 'touch-bar']
  }),
      appWrap = makeElement('div', {
    id: 'app'
  }),
      appCatsClass = makeElement('div', {
    className: 'app-cats'
  }),
      appCatsId = makeElement('div', {
    id: 'app-cats'
  }),
      href = 'javascript:void(0)';
  // 本地测试api: http://0.0.0.0:8000
  // 本地测试server需要安装express然后运行
  // node proxy.js
  // 反向代理服务器: https://untitled-9xhdhlw40u0u.runkit.sh
  // api分析见主目录的: API.md
  // let api = 'http://0.0.0.0:8000'
  var api = 'https://untitled-9xhdhlw40u0u.runkit.sh';
  var append = function append(after, before) {
    before.forEach(function (item) {
      after.appendChild(item);
    });
  },
      jsDOM = {
    _hotPost: function _hotPost() {
      uilt.ajax({
        method: 'get',
        JSON: true,
        url: api + '/category/list/ANDROID/2.0',
        success: function success(data) {
          return postInfo(data);
        }
      });
    }
    // {
    //   let isLoading = makeElement('div',{
    //       id: 'loading',
    //       className: 'fixed'
    //       }),
    //       div = makeElement('div'),
    //       isLoadingWrap = makeElement('img',{
    //         src: 'https://i.loli.net/2019/03/05/5c7e0fc078a98.gif'
    //       })
    //   append(div,[isLoadingWrap])
    //   append(isLoading,[div])
    //   $('#root').appendChild(isLoading)
    // }
  };function vMoudel(e, status) {
    e.classList.remove('none', 'show');
    if (status) {
      e.classList.add(status);
    } else {
      e.classList.add('none');
    }
  }
  var postInfo = function postInfo(data) {
    if (data.status != 1) {
      console.error('请求失败,可能是接口的问题😵');
      $('#root').innerHTML = '\n          \u8BF7\u6C42\u5931\u8D25,\u53EF\u80FD\u662F\u63A5\u53E3\u7684\u95EE\u9898,\u8BF7\u6253\u5F00\u5F00\u53D1\u8005\u6A21\u5F0F\u67E5\u770B\u7F51\u7EDC\u8BF7\u6C42(network)\n        ';
      return;
    } else if (data.status == 1) {
      // console.log(data);
      (function () {
        var aHot = makeElement('a', {
          className: 'hot-post',
          href: href
        }),
            divClearfix = makeElement('div', {
          className: 'clearfix'
        }),
            fl_ = makeElement('div', {
          className: ['fl', 'hot-post-img']
        }),
            fl__ = makeElement('div', {
          className: ['fl', 'hot-post-info']
        }),
            hotPostTitle = makeElement('p', {
          className: 'hot-post-title'
        }),
            hotPostDesc = makeElement('p', {
          className: 'hot-post-desc',
          html: data.postInfo.detail
        }),
            hotPostView = makeElement('p', {
          className: ['hot-post-view', 'clearfix']
        });
        {
          var iconAss = {
            eyes: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" version="1.1" fill="#000000" width="16" height="16" xlink="http://www.w3.org/1999/xlink"><g id="surface1" fill="#000000"><path style=" ;" d="M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z " fill="#000000"></path></g></svg>',
            comment: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" version="1.1" fill="#000000" width="16" height="16" xlink="http://www.w3.org/1999/xlink"><g id="surface1" fill="#000000"><path style=" ;" d="M 3 6 L 3 26 L 12.585938 26 L 16 29.414063 L 19.414063 26 L 29 26 L 29 6 Z M 5 8 L 27 8 L 27 24 L 18.585938 24 L 16 26.585938 L 13.414063 24 L 5 24 Z M 9 11 L 9 13 L 23 13 L 23 11 Z M 9 15 L 9 17 L 23 17 L 23 15 Z M 9 19 L 9 21 L 19 21 L 19 19 Z " fill="#000000"></path></g></svg>'
          },
              hotPostComment = makeElement('span', {
            className: ['fr', 'hot-post-comment']
          }),
              hotPostHit = makeElement('span', {
            className: ['fr', 'hot-post-hit']
          });
          hotPostHit.innerHTML = iconAss.eyes + data.postInfo.commentCount;
          hotPostComment.innerHTML = iconAss.comment + data.postInfo.hit, append(hotPostView, [makeElement('span', {
            className: 'fl',
            html: data.postInfo.user.nick
          }), hotPostComment, hotPostHit]);
        }

        {
          hotPostTitle.appendChild(makeElement('i', {
            html: data.postInfo.score
          }));
          hotPostTitle.innerHTML += data.postInfo.title;
          append(fl__, [hotPostTitle, hotPostDesc, hotPostView]);
        }

        function random(n, m) {
          return Math.floor(Math.random() * m);
        }
        append(fl_, [makeElement('img', {
          src: data.postInfo.images[random(0, data.postInfo.images.length)]
        })]);
        append(divClearfix, [fl_, fl__]);
        aHot.appendChild(divClearfix);
        aHot.setAttribute('data-id', data.postInfo.postID);
        aHot.onclick = function (e) {
          return APPdetail(data.postInfo.postID);
        };

        appCatsId.appendChild(aHot);

        {
          var p = makeElement('p', {
            className: 'app-cats-title'
          });
          p.appendChild(makeElement('span', {
            html: '全部板块'
          }));
          appCatsId.appendChild(p);
        }

        {
          var ul = makeElement('ul', {
            className: 'app-cats-list'
          });
          var tmp = data.categories;

          var _loop = function _loop(index) {
            var element = tmp[index];
            if (element.title == '系统推荐') return 'continue';
            var li = makeElement('li'),
                a = makeElement('a', {
              className: 'clearfix'
            }),
                spanIcon = makeElement('span', {
              className: ['app-cats-icon', 'fl']
            }),
                spanName = makeElement('span', {
              className: ['app-cats-name', 'fl'],
              html: element.title
            }),
                pFl = makeElement('p', {
              className: 'fl'
            });
            pFl.innerHTML = '\n                      <span class="app-cats-view">\n                        \uD83D\uDD25\n                        <i>' + element.viewCountFormated + '</i>\n                      </span>\n                      <span class="app-cats-post">\n                        \uD83D\uDC4B\n                        <i>' + element.postCountFormated + '</i>\n                      </span>\n                    ';
            spanIcon.innerHTML = '<img src="' + element.icon + '">';
            a.addEventListener('click', function () {
              return plateGo(element.categoryID);
            }, false);
            append(a, [spanIcon, spanName, pFl]);
            a.setAttribute('title', element.description);
            a.setAttribute('data-id', element.categoryID);
            li.appendChild(a);
            ul.appendChild(li);
          };

          for (var index = 2; index < tmp.length; index++) {
            var _ret = _loop(index);

            if (_ret === 'continue') continue;
          }
          appCatsId.appendChild(ul);
        }
      })();
    }
  };
  var plateInfo = function plateInfo(data) {
    if (data.status != 1) {
      console.error('请求失败,可能是接口的问题😵');
      $('#root').innerHTML = '\n          \u8BF7\u6C42\u5931\u8D25,\u53EF\u80FD\u662F\u63A5\u53E3\u7684\u95EE\u9898,\u8BF7\u6253\u5F00\u5F00\u53D1\u8005\u6A21\u5F0F\u67E5\u770B\u7F51\u7EDC\u8BF7\u6C42(network)\n        ';
      return;
    } else if (data.status == 1) {
      {
        var _fixedWrap = makeElement('div', {
          className: ['fixed', 'plate-bar']
        }),
            button = makeElement('button', {
          id: 'btn-plate-back'
        }),
            span = makeElement('span', {
          html: '返回'
        }),
            svg = '\n        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" fill="#fff">\n          <g fill="#fff">\n            <path d="M 19.03125 4.28125 L 8.03125 15.28125 L 7.34375 16 L 8.03125 16.71875 L 19.03125 27.71875 L 20.46875 26.28125 L 10.1875 16 L 20.46875 5.71875 Z " fill="#fff"></path>\n          </g>\n        </svg>\n        ',
            listWrap = void 0;
        button.innerHTML = svg;
        button.append(span);
        button.addEventListener('click', function () {
          vMoudel(document.querySelector('.list-wrap'));
          vMoudel($('#app'), 'show');
        });
        _fixedWrap.appendChild(button);
        {
          if (document.querySelector('.list-wrap')) {
            listWrap = document.querySelector('.list-wrap');
            listWrap.innerHTML = '';
          } else {
            listWrap = makeElement('div', {
              className: ['list-wrap']
            });
          }
          var postTagInfo = makeElement('div', {
            className: 'post-tag-info'
          });
          postTagInfo.innerHTML = '\n                <img src="' + data.category.icon + '">\n                <p class="cat-title">\n                  <strong>' + data.category.title + '</strong>\n                  <i>' + data.category.description + '</i>\n                </p>\n                <p class="cat-view">\n                  <span>' + data.category.postCountFormated + '</span>\n                  <i>' + data.category.viewCountFormated + '</i>\n                </p>\n              ';
          listWrap.appendChild(postTagInfo);
        }
        {
          var postTagLs = makeElement('div', {
            className: 'post-tag-ls'
          });
          data.category.tags.forEach(function (item) {
            var a = makeElement('a', {
              href: href,
              html: item.name
            });
            postTagLs.appendChild(a);
          });
          listWrap.appendChild(postTagLs);
        }
        {
          var aDiv = makeElement('div'),
              ul = makeElement('ul', {
            className: 'post-push-ls'
          }),
              p = makeElement('p', {
            className: 'tc'
          }),
              a = makeElement('a', {
            className: 'more-comments',
            href: href,
            html: '换一批👋'
          });
          p.appendChild(a);
          data.weightAndTopPost.forEach(function (item) {
            var hotLi = makeElement('li', {
              className: 'post-push-top'
            }),
                hotA = makeElement('a', {
              href: href
            });hotA.innerHTML = '\n                <p>\n                  <i>\u7F6E\u9876</i> <i>' + item.score + '</i> ' + item.title + '\n                </p>\n              ';
            hotA.addEventListener('click', function () {
              return APPdetail(item.postID);
            });
            hotLi.appendChild(hotA);
            ul.appendChild(hotLi);
          });
          data.posts.forEach(function (item) {
            var post = makeElement('li', {
              className: 'post-push'
            }),
                a = makeElement('a', {
              href: href
            });
            function isImages() {
              return item.images[0] ? 0 : null;
            }
            a.innerHTML = '\n                <p class="pt">\n                  <i class="hit">' + item.score + '</i>' + item.title + '\n                </p>\n                <hr>\n                <pre class="detail">' + item.detail + '</pre>\n                <ul>\n                  <li>\n                    <img class="img-zooming" src="' + item.images[isImages()] + '">\n                  </li>\n                </ul>\n                <div class="clearfix info-by">\n                  <div class="fl">' + item.user.nick + '</div>\n                  <div class="fr">\n                    <span>\u6D4F\u89C8\u91CF: ' + item.hit + '</span>\n                    <span>\u8BC4\u8BBA: ' + item.commentCount + '</span>\n                  </div>\n                </div>\n              ';
            a.addEventListener('click', function () {
              APPdetail(item.postID);
              vMoudel(document.querySelector('.list-wrap'));
            });
            post.appendChild(a);
            ul.appendChild(post);
          });
          append(p, [a]);
          append(aDiv, [ul, p]);
          listWrap.appendChild(aDiv);
        }
        listWrap.appendChild(_fixedWrap);
        $('#root').appendChild(listWrap);
      }
    }
  };
  var APPdetail = function APPdetail(id) {
    vMoudel(document.querySelector('#app'));
    uilt.ajax({
      method: 'get',
      JSON: true,
      url: api + '/post/detail/ANDROID/2.1',
      data: {
        post_id: id,
        post_size: 20,
        page_no: 1
      },
      success: function success(data) {
        var APP = document.querySelector('#app-detail') ? document.querySelector('#app-detail') : makeElement('div', {
          id: 'app-detail'
        });
        vMoudel(APP, 'show');
        APP.innerHTML = '';
        console.log(data);
        {
          var topBar = makeElement('div', {
            className: ['fixed', 'plate-bar']
          }),
              button = makeElement('button'),
              span = makeElement('span', {
            html: data.post.category.title
          }),
              svg = '\n         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" fill="#fff">\n           <g fill="#fff">\n             <path d="M 19.03125 4.28125 L 8.03125 15.28125 L 7.34375 16 L 8.03125 16.71875 L 19.03125 27.71875 L 20.46875 26.28125 L 10.1875 16 L 20.46875 5.71875 Z " fill="#fff"></path>\n           </g>\n         </svg>\n         ';
          button.innerHTML = svg;
          append(button, [span]);
          button.addEventListener('click', function () {
            vMoudel(APP);
            vMoudel(document.querySelector('.list-wrap'), 'show');
          });
          topBar.appendChild(button);
          APP.appendChild(topBar);
        }
        {
          var gen = function gen(args, bl) {
            var av = makeElement('p', {
              className: 'post-detail-avg'
            }),
                d = makeElement('div'),
                p = makeElement('p', {
              className: 'imgs'
            });
            bl ? av.classList.add('up') : av.classList.remove('up');
            av.innerHTML = '\n               <img src="' + args.avatar + '">\n               <span>' + args.nick + '</span>\n             ';
            d.innerHTML = '\n             <pre class="post-desc">\n             ' + args.body + '\n             </pre>\n           ';
            if (args.images.length) {
              args.images.forEach(function (item) {
                var ivg = makeElement('img', {
                  src: item
                });
                p.appendChild(ivg);
              });
              d.appendChild(p);
            }
            append(APP, [av, d]);
          };

          var postDetailTitle = makeElement('h2', {
            className: 'post-detail-title',
            html: data.post.title
          }),
              pp = makeElement('p', {
            className: 'tc'
          }),
              aa = makeElement('a', {
            className: 'more-comments',
            href: href,
            html: '加载更多评论👋'
          });

          append(APP, [postDetailTitle]);
          gen({
            avatar: data.post.user.avatar,
            nick: data.post.user.nick,
            body: data.post.detail,
            images: data.post.images
          }, 1);
          data.comments.forEach(function (item) {
            var ob = {
              avatar: item.user.avatar,
              nick: item.user.nick,
              body: item.text,
              images: item.images
            };
            if (item.user.nick == data.post.user.nick) {
              gen(ob, 1);
            } else gen(ob);
          });
          // 判断是否有更多的评论
          var isFlag = true;
          if (isFlag) {
            aa.addEventListener('click', function () {});
            pp.appendChild(aa);
            append(APP, [pp]);
          }
        }
        $('#root').appendChild(APP);
      }
    });
  };
  // jsDOM._post()
  function plateGo(data) {
    vMoudel($('#app'));
    uilt.ajax({
      method: 'get',
      JSON: true,
      url: api + '/post/list/ANDROID/2.1',
      data: {
        cat_id: data,
        count: 20 // 默认传递20个帖子
      },
      success: function success(data) {
        plateInfo(data);
        vMoudel(document.querySelector('.list-wrap'), 'show');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    return jsDOM._hotPost();
  });
  append(appCatsClass, [appCatsId]);
  append(appWrap, [fixedWrap, appCatsClass]);
  fixedWrap.appendChild(makeElement('p', {
    html: '葫芦侠三楼'
  }));
  append($('#root'), [appWrap]);
})();
