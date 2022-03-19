from django.shortcuts import render
from django.views.generic import View
# Create your views here.

def portfolio_home(request):
	return render(request, template_name="portfolio_temp/index-new.html")

def portfolio_old(request):
	return render(request, template_name="portfolio_temp/index.html")

class PortfolioDetails(View):
	def get(self,request):
		return render(request, template_name="portfolio-details.html")