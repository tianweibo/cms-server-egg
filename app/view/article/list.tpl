<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>文章列表</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    共：{{ total }} 条数据
    <a href="/article/createView">[新建]</a>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="/article/detail?id={{ item.id }}">{{ item.title }}</a>  {{ helper.formatDate(item.created_at) }} 
          <a href="/article/edit?id={{ item.id }}">[编辑]</a>
          <a href="/article/delete?id={{ item.id }}" onclick="return confirm('are you sure?')">[删除]</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
