from django.contrib import admin
from . import models


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = 'id', 'user', 'text'
    ordering = ['id']


class UserAdmin(admin.ModelAdmin):
    list_display = 'id', 'user', 'email'
    ordering = ['id']
