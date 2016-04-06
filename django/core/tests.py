from django.test import TestCase
from .models import Comment
from django.contrib.auth.models import User


# TODO: Write tests for serializers, views

class CommentTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user('test_user')
        cls.text = 'Test Comment'

        cls.test_comment = Comment.objects.create(
            user=cls.user,
            text=cls.text
        )

    def test_comment_props(self):
        self.assertEqual(self.test_comment.user, self.user)
        self.assertEqual(self.test_comment.text, self.text)
