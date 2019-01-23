//
// $(() => {
//   let url = 'http://0.0.0.0:8000'
//   let app = {
//     category: $.ajax({
//         url: `${url}/category/forum/list/ANDROID/2.0`,
//         success: function(data) {
//           data.categoryforum.forEach(item=>{
//             a = $('<a>',{
//               html: item.title,
//               "data-desc": item.description,
//               "data-id": item.id
//             })
//             // $('#app').append(a)
//           })
//         }
//       }),
//     postList: (id,count,s) => {
//       $.ajax({
//         url: `${url}/post/list/ANDROID/2.1`,
//         data: {
//           cat_id: id,
//           count: count
//         },
//         success: s
//       })
//     }
//   }
//   app.postList(56,20,data=>{
//     console.log(data);
//   })
// })
