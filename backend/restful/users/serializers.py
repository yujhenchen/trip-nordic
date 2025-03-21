from rest_framework import serializers
from.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['email', 'password']

	def create(self, validated_data):
		# explicitly call the create_user method of the UserManager, otherwise default call create method
		user = User.objects.create_user(**validated_data)
		return user
