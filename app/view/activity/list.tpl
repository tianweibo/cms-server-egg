<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>活动列表</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    共：{{ total }} 条数据
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="/activity/detail?id={{ item.activity_id }}">{{ item.name }}</a>  {{ helper.formatDate(item.created_at) }}
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
