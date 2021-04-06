<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>{{ item.name }}</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <h4>{{ item.name }}</h4>
    <div>活动名称: {{ item.name }}<div>
    <div>活动描述: {{ item.description }}<div>
    {# <div>创建时间: {{ helper.formatDate(item.created_at) }}<div> #}
  </body>
</html>
