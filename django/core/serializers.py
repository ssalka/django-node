from rest_framework import serializers
from .models import User, Comment


class UserListingField(serializers.RelatedField):
    def to_representation(self, value):
        """
        String representation of 'user' field for /comments API endpoint
        """
        return value.username

    def to_internal_value(self, username):
        """
        Returns matching user model instance to Django
        """
        return User.objects.get(username=username)


class DateTimeListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.strftime('%m-%d-%Y %T:%M%p')


class CommentListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            "comment": value.text,
            "date_posted": value.created.strftime('%m-%d-%Y'),
            "time_posted": value.created.strftime('%T:%M%p')
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentListingField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'comments')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserListingField(read_only=True)
    created = DateTimeListingField(read_only=True)

    class Meta:
        model = Comment
        fields = ('user', 'text', 'created')
