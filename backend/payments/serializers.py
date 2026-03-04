from rest_framework import serializers

from appointments.models import Appointment

from .models import Payment


class PaymentSubmitSerializer(serializers.ModelSerializer):
    appointment_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "appointment_id",
            "transaction_id",
            "screenshot",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "status", "created_at", "updated_at"]

    def validate_screenshot(self, value):
        allowed_types = {"image/jpeg", "image/jpg", "image/png"}
        content_type = (value.content_type or "").lower()
        if content_type not in allowed_types:
            raise serializers.ValidationError("Screenshot must be jpg, jpeg, or png.")

        max_size = 5 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError("Screenshot size must be 5MB or less.")
        return value

    def validate(self, attrs):
        request = self.context.get("request")
        appointment_id = attrs.get("appointment_id")
        appointment = Appointment.objects.filter(id=appointment_id).first()
        if not appointment:
            raise serializers.ValidationError({"appointment_id": "Appointment not found."})

        if not request or appointment.patient_id != request.user.id:
            raise serializers.ValidationError(
                {"appointment_id": "You can submit payment only for your own appointment."}
            )

        attrs["appointment"] = appointment
        return attrs

    def create(self, validated_data):
        validated_data.pop("appointment_id", None)
        request = self.context["request"]
        return Payment.objects.create(user=request.user, **validated_data)


class PaymentAdminListSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    appointment_display = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            "id",
            "user",
            "user_name",
            "appointment",
            "appointment_display",
            "transaction_id",
            "screenshot",
            "status",
            "created_at",
            "updated_at",
        ]

    def get_user_name(self, obj):
        user = obj.user
        full = f"{getattr(user, 'first_name', '')} {getattr(user, 'last_name', '')}".strip()
        return full or user.username

    def get_appointment_display(self, obj):
        appointment = obj.appointment
        return f"#{appointment.id} - {appointment.date} {appointment.time_slot}"

