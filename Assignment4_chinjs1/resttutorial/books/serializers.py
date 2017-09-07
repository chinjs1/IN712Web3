from rest_framework import serializers
from books.models import Book
from django.contrib.auth.models import User

class BookSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Book
		fields = ('id', 'owner','title', 'author', 'intro', 'price', 'url')
		
class UserSerializer(serializers.ModelSerializer):
	books = serializers.PrimaryKeyRelatedField(many=True, queryset=Book.objects.all())

	class Meta:
		model = User
		fields = ('id', 'username', 'books', 'owner')