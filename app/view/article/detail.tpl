<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>{{ item.title }}</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <h4>{{ item.title }}</h4>
    <div>文章ID: {{ item.id }}<div>
    <div>文章名称: {{ item.title }}<div>
    <div>文章描述: {{ item.description }}<div>
    <div>创建时间: {{ helper.formatDate(item.created_at) }}<div>
    <div>更新时间: {{ helper.formatDate(item.updated_at) }}<div>
  </body>
</html>
