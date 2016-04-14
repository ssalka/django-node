from django.shortcuts import render
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, CommentSerializer
from .models import User, Comment
import redis


@login_required
def home(request):
    """Renders index template"""
    comments = Comment.objects.order_by('created')[:100]
    context = {
        'title': 'Django-Node Chat Room',
        'comments': [
            CommentSerializer(comment).data for comment in comments
        ]
    }
    return render(request, 'index.html', context)


def get_current_user(request):
    return User.objects.get(username=request.user)


@csrf_exempt
def node_api(request):
    """
    Saves received comment to database and publishes comment to chat stream
    """
    try:
        # Get current user
        session = Session.objects.get(session_key=request.POST.get('sessionid'))
        user_id = session.get_decoded().get('_auth_user_id')
        user = User.objects.get(id=user_id)

        # Add comment to database
        comment = Comment.objects.create(user=user, text=request.POST.get('comment'))

        # Publish comment to Redis
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        r.publish('chat', CommentSerializer(comment).to_json())

        return HttpResponse("success")
    except Exception as e:
        return HttpResponseServerError(str(e))


class UserViewSet(viewsets.ModelViewSet):
    """
    View for /users API endpoint and subresources
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @list_route(permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        """
        Routes /users/me to current user
        """
        self.object = get_current_user(request)
        serializer = self.get_serializer(self.object)
        return Response(serializer.data)

    @detail_route()
    def comments(self, request, pk=None):
        """
        Routes /users/{id}/comments to a user's comments
        """
        user = self.get_object()
        comments = Comment.objects.filter(user=user)
        context = {'request': request}
        comment_serializer = CommentSerializer(comments, many=True, context=context)
        return Response(comment_serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    """
    View for /comments API endpoint
    """
    # TODO: Fix POST form to automatically use authenticated user
    queryset = Comment.objects.all().order_by('id')
    serializer_class = CommentSerializer
