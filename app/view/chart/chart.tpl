<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>chart</title>
</head>
<body>
  <h1>chart demo</h1>
  <button class="add">新增</button>
  <button class="query">查询</button>

  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
  <script>  
    document.querySelector('.add').addEventListener('click', function() {
      function getCookie(name){
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
          else
          return null;
      }
      $.ajax({
        method: "POST",
        url: "/chart/add",
        headers:{
          'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
        },
        data: { name: "John", location: "Boston" }
      })
      .done(function( msg ) {
        console.log( "Data Saved: " + msg );
      });
    }, false)

    document.querySelector('.query').addEventListener('click', function() {
      function getCookie(name){
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
          else
          return null;
      }
      $.ajax({
        method: "POST",
        url: "/chart/query",
        headers:{
          'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
        }
      })
      .done(function( msg ) {
        console.log( "Data Saved: " + msg );
      });
    }, false)
  </script>
</body>
</html>