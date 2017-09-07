from django.conf.urls import url
from . import views

urlpatterns = [

	# Every article
    url(r'^$', views.article_list, name='article_list'),
	
	# Details of article (title, text, img, date)
	url(r'^article/(?P<pk>\d+)/$', views.article_detail, name='article_detail'),
	
	# New, edited and removed articles
	url(r'^article/new/$', views.article_new, name='article_new'),
	url(r'^article/(?P<pk>\d+)/edit/$', views.article_edit, name='article_edit'),
	url(r'^article/(?P<pk>\d+)/remove/$', views.article_remove, name='article_remove'),
	
	# Sections of articles
	url(r'^section/(?P<pk>\w{2})/$', views.article_section, name='article_section'),
]
