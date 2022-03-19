from django.contrib import admin
from user.models import MemberDetails

# Register your models here.

class ShowMemberDetails(admin.ModelAdmin):
	list_display = ("name","age","mobile","email","role","dob","status","gender")


admin.site.register(MemberDetails,ShowMemberDetails)