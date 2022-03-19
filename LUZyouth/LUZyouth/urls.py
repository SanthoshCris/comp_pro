"""LUZyouth URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user.views import home, ListMember, EditMember, DeleteMember
from finance.views import  FinanceDetailsList, ExpensesList
from portfolio.views import portfolio_home, PortfolioDetails, portfolio_old

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('home/', home.as_view(), name="home"),
    path('portfolio/', portfolio_home, name="portfolio_main_page" ),
    path('portfolio_new/', portfolio_old),
    path('portfoliodetails/', PortfolioDetails.as_view(), name="portfolio_details_form"),
    path('memberlist/',ListMember.as_view(), name="user_list"),
    # path('addmember/',AddMember.as_view(), name="add_new_user" ),
    path('editmember/<int:pk>', EditMember.as_view(), name="edit_member"),
    # path('weekincome/', WeekIncome.as_view()),
    path('financedetails/', FinanceDetailsList.as_view(), name="finance_details"),
    # path('expensesinfo/',ExpensesInfo.as_view(), name="expenses_info" ),
    path('expensesdetails/',ExpensesList.as_view(), name="expenses_details"),
    path('deletemember/', DeleteMember.as_view(), name="deletemember")
    # path('tabletest/', Tabletest.as_view())
]

