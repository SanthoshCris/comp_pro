from django.shortcuts import render
from django.views.generic import View
from user.models import MemberDetails
from django.http import JsonResponse
from .models import FinanceDetails, ExpensesDetails
from datetime import datetime
from django.db.models import Sum



# Create your views here.

class FinanceDetailsList(View):
	def get(self, request):
		finance_details = FinanceDetails.objects.all()
		month_result = FinanceDetails.objects.values('name','month').order_by('name','month').annotate(total=Sum('amount'))
		week_result = FinanceDetails.objects.values('name','week').order_by('name','week').annotate(total=Sum('amount'))
		year_result = FinanceDetails.objects.values('name','year').order_by('name','year').annotate(total=Sum('amount'))

		total_income = FinanceDetails.objects.values('amount').aggregate(total=Sum('amount'))
		total_expences = ExpensesDetails.objects.values('amount').aggregate(total=Sum('amount'))
		balance_fund = total_income['total'] - total_expences['total']

		member_names = MemberDetails.objects.values_list("name", flat=True)
		a = MemberDetails.objects.all()
		# print(a)
		# print(list(member_names))
		# mem_name_data = {"member_names":list(member_names)}

		finance_data= {
					 	"finance_details": finance_details, 
						"month_result": month_result, 
						"week_result": week_result, 
						"year_result": year_result,
						"total_income": total_income['total'],
						"total_expences": total_expences['total'],
						"balance_fund": balance_fund,
						"member_names":list(member_names),
						"header": "Income Details"
						}
		return render(request,template_name="finance_details.html", context=finance_data)

	def post(self, request):
		if request.is_ajax() and request.method == 'POST':
			name = request.POST.get('member_name')
			date = request.POST.get('date')
			amount = request.POST.get('amount')
			status = request.POST.get('status')
			feedback = request.POST.get('feedback')	

			# getting week number and month
			sep_date = datetime.strptime(date,"%d-%m-%Y")
			print(sep_date.year)
			print(sep_date.month)
			week_number = sep_date.isocalendar()[1]
			print(week_number)


			finance_table = FinanceDetails()
			finance_table.name = name
			finance_table.date = date
			finance_table.amount = amount
			finance_table.status = status
			finance_table.feedback = feedback
			finance_table.month  = sep_date.month
			finance_table.week = sep_date.isocalendar()[1]
			finance_table.year = sep_date.year
			finance_table.save()


			return JsonResponse({"message":'Amount Added Successfully'}, status=200)



class ExpensesList(View):
	def get(self, request):
		expenses_list = ExpensesDetails.objects.all()
		month_result = ExpensesDetails.objects.values('expense_for','month').order_by('expense_for','month').annotate(total=Sum('amount'))
		week_result = ExpensesDetails.objects.values('expense_for','week').order_by('expense_for','week').annotate(total=Sum('amount'))
		year_result = ExpensesDetails.objects.values('expense_for','year').order_by('expense_for','year').annotate(total=Sum('amount'))

		expenses_data= {
					 	"expenses_list": expenses_list, 
						"month_result": month_result, 
						"week_result": week_result, 
						"year_result": year_result,
						"header": "Expenses Details"
						}
		print(expenses_data)
		return render(request,template_name="expenses-details.html", context=expenses_data)


	def post(self, request):
			if request.is_ajax() and request.method == 'POST':
				reason = request.POST.get('reason')
				expense_for = request.POST.get('expense_for')
				date = request.POST.get('date')
				amount = request.POST.get('amount')
				feedback = request.POST.get('feedback')	

				# getting week number and month
				sep_date = datetime.strptime(date,"%d-%m-%Y")
				print(sep_date.year)
				print(sep_date.month)
				week_number = sep_date.isocalendar()[1]
				print(week_number)
				print(reason, date, amount, feedback, expense_for)


				expenses_table = ExpensesDetails()
				expenses_table.reason = reason
				expenses_table.expense_for = expense_for
				expenses_table.date = date
				expenses_table.amount = amount
				expenses_table.feedback = feedback
				expenses_table.month  = sep_date.month
				expenses_table.week = sep_date.isocalendar()[1]
				expenses_table.year = sep_date.year
				expenses_table.save()
				return JsonResponse({"message":'Entry Added Successfully'}, status=200)


 