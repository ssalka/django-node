from django.db import models
from django.contrib.auth.models import User

# TODO: Want user model with pk=username for /api/users/{pk}/ detail-route

class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments')
    text = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True, null=True)