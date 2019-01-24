$(() => {
  let url = 'http://0.0.0.0:8000'
  let app = {
    category: $.ajax({
        url: `${url}/category/list/ANDROID/2.0`,
        success: function(data) {
          let y = data.categories
          y.splice(0,2)
          y.splice(y.length-3,1)
          let r = new Ractive({
            target: '#app-cats',
            template: '#list',
            data: {
              hotPost: data.postInfo,
              ls: y
            }
          })
        }
      }),
    postList: (id,count,s) => {
      $.ajax({
        url: `${url}/post/list/ANDROID/2.1`,
        data: {
          cat_id: id,
          count: count
        },
        success: s
      })
    },
    postDetail: (id,z,p,s) => {
      z = z || 20
      $.ajax({
        url:`${url}/post/detail/ANDROID/2.1`,
        data: {
          'post_id': id,
          'post_size': z,
          'page_no': p
        },
        success: s
      })
    }
  }
  window.listView = e=>{
    app.postList($(e).attr('data-id'),20,data=>{
        new Ractive({
          target: '#app-cats',
          template: '#post-tag',
          data: {
            category: data.category,
            a: data.category.tags,
            top: data.weightAndTopPost,
            ls: data.posts,
            imgs: data.posts
          }
        })
        new Zooming().listen('.img-zooming')
    })
  }
  window.postView = e=>{
    app.postDetail($(e).attr('data-id'),20,1,data=>{
      new Ractive({
        target: '#app-detail',
        template: '#post-detail-temp',
        data: data
      })
      new Zooming().listen('.img-zooming')
    })
    $('#app-cats').fadeOut()
    $('#app-detail').fadeIn()
    $('html , body').animate({scrollTop: 0},'slow');
  }
  $('#up').fadeOut()
  $(window).on('scroll',e=>{
    if(this.scrollTop > 100){
      $('#up').fadeIn()
    }else{
      $('#up').fadeOut()
    }
  })
})
