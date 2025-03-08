from rest_framework import serializers
from.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('email', 'password')

	def create(self, validated_data):
        # Extract password and ensure it's hashed before saving
		password = validated_data.pop('password')
		user = User.objects.create_user(**validated_data, password=password)
		return user
