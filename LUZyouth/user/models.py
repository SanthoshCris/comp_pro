from django.db import models

# Create your models here.

class MemberDetails(models.Model):
	name = models.CharField(max_length=100)
	age = models.IntegerField()
	mobile = models.IntegerField()
	email = models.EmailField()
	role = models.CharField(max_length=50)
	dob = models.DateField()
	status = models.CharField(max_length=50)
	gender = models.CharField(max_length=20)