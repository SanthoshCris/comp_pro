from django.db import models

# Create your models here.

class FinanceDetails(models.Model):
	name = models.CharField(max_length=100)
	date = models.CharField(max_length=50)
	amount = models.IntegerField()
	status = models.CharField(max_length=10)
	feedback = models.CharField(max_length=200)		
	month = models.IntegerField()
	week = models.IntegerField()
	year = models.IntegerField()

class ExpensesDetails(models.Model):
	reason = models.CharField(max_length=100)
	expense_for = models.CharField(max_length=200)
	date = models.CharField(max_length=50)
	amount = models.IntegerField()
	feedback = models.CharField(max_length=200, null=True)		
	month = models.IntegerField()
	week = models.IntegerField()
	year = models.IntegerField()