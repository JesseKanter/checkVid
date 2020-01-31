from django.conf.urls import url
from Report.views import Report


urlpatterns = [
    url('', Report, name='submission'),
]



##from django.urls import path
##
##from . import views
##
##urlpatterns = [
##    path('', views.index, name='index'),
##]
