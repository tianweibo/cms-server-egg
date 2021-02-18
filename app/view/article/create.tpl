<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>编辑：{{ item.title }}</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <form action="/article/create">
      <div>
        <label>标题</label>
        <input name type="text" value="" />
      </div>
      <div>
        <label>内容</label>
        <textarea name="description"></textarea>
      </div>
      <div>
        <button type="submit">提交</button>
      </div>
    </form>
  </body>
</html>
