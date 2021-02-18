<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>编辑：{{ item.title }}</title>
    <link rel="stylesheet" href="/public/css/news.css" />
    <script>
      console.log('===test$===', $);
    </script>
  </head>
  <body>
    <form method="post" action="/article/update?id={{ item.id }}">
      <div>
        <label>标题</label>
        <input name="title" type="text" value="{{ item.title }}" />
      </div>
      <div>
        <label>内容</label>
        <textarea name="description">{{ item.description }}</textarea>
      </div>
      <div>
        <button type="submit">提交</button>
      </div>
    </form>
  </body>
</html>
