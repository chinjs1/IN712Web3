from django.db import models
from django.utils import timezone

# Create your models here.

# Article Model
class Article(models.Model):

	# Each section of the news
	SECTION = (
		("NZ", "New Zealand"),
		("IN", "International"),
		("TH", "Tech"),
		("SP", "Sports")
	)

	author = models.ForeignKey('auth.User')
	title = models.CharField(max_length=200)
	section = models.CharField(max_length=2, choices=SECTION, default="NZ")
	introduction = models.CharField(max_length=200)
	text = models.TextField()
	url = models.CharField(max_length=200)
	created_date = models.DateTimeField(default=timezone.now) 
	
	def publish(self):
		self.published_date = timezone.now()
		self.save()

	def __str__(self):
		return self.title