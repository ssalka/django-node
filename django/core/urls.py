from django.conf.urls import include, url
from django.contrib.admin import site as admin_site
from django.contrib.auth.views import login, logout
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^admin/', include(admin_site.urls), name='admin'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^node_api$', views.node_api, name='node_api'),
    url(r'^login/$', login, {'template_name': 'admin/login.html'}, name='login'),
    url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
]