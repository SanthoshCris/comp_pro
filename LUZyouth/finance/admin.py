from django.contrib import admin
from .models import FinanceDetails, ExpensesDetails
# Register your models here.

class ShowFinanceDetails(admin.ModelAdmin):
	list_display = ("name","date","amount","status","feedback","month","week","year")

class ShowExpensesDetails(admin.ModelAdmin):
	list_display = ("reason","expense_for","date","amount","feedback","month","week","year")

admin.site.register(FinanceDetails,ShowFinanceDetails)
admin.site.register(ExpensesDetails,ShowExpensesDetails)


