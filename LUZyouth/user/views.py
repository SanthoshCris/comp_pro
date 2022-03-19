from django.shortcuts import render, redirect
from django.views.generic import View
from .models import MemberDetails
from django.http import JsonResponse
import json
# Create your views here.


class home(View):
	def get(self,request):
		return render(request,template_name='index.html')


class ListMember(View):
	def get(self,request):
		member_list = MemberDetails.objects.all()

		total_members = member_list.count()
		print(total_members)

		active_members = MemberDetails.objects.filter(status='Active').count()
		print(active_members)

		inactive_members = total_members-active_members
		print(inactive_members)

		data = {
				'member_list': member_list,
				'total_members': total_members,
				'active_members': active_members,
				'inactive_members': inactive_members,
				"header": "Member Details"
			   }

		return render(request, template_name='list-member.html', context=data)

	def post(self, request):
		if request.is_ajax() and request.method == 'POST':
			name = request.POST.get('name')
			age = request.POST.get('age')
			mobile = request.POST.get('mobile')
			email = request.POST.get('email')
			role = request.POST.get('role')
			dob = request.POST.get('dob')
			status = request.POST.get('status')
			gender = request.POST.get('gender')

			print ([name,age,mobile,email,role,dob,status,gender])
			#Save to database
			member_det = MemberDetails()

			member_det.name=name
			member_det.age = age
			member_det.mobile = mobile
			member_det.email = email
			member_det.role = role
			member_det.dob = dob
			member_det.status = status
			member_det.gender = gender		
			member_det.save()
			return JsonResponse({"message":'Member Added Successfully'}, status=200)


class EditMember(View):
	def get(self, request, pk):
		mem_previous_det = MemberDetails.objects.get(id=pk)
		return render(request, template_name='edit-member.html', context={"mem_details":mem_previous_det})

	def post(self,request, pk):

		#Values
		name = request.POST.get('name')
		age = request.POST.get('age')
		mobile = request.POST.get('mobile')
		email = request.POST.get('email')
		role = request.POST.get('role')
		dob = request.POST.get('dob')
		status = request.POST.get('status')
		gender = request.POST.get('gender')

		print ([name,age,mobile,email,role,dob,status,gender])
		#Save to database
		member_new_det = MemberDetails.objects.get(id=pk)

		member_new_det.name=name
		member_new_det.age = age
		member_new_det.mobile = mobile
		member_new_det.email = email
		member_new_det.role = role
		member_new_det.dob = dob
		member_new_det.status = status
		member_new_det.gender = gender		
		member_new_det.save()
		return redirect('/memberlist')

class DeleteMember(View):
	def post(self, request):
		if request.is_ajax() and request.method == "POST":
			data = json.load(request)
			id = data.get('id')
			member = MemberDetails.objects.get(id=id)
			member.delete()
			return JsonResponse({"message":'Member Deleted Successfully'}, status=200)

