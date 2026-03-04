from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import IsAdmin
from appointments.models import Appointment

from .models import Payment
from .serializers import PaymentAdminListSerializer, PaymentSubmitSerializer


class SubmitPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PaymentSubmitSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        try:
            payment = serializer.save()
        except IntegrityError:
            return Response(
                {"transaction_id": ["This transaction ID already exists."]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {
                "message": "Payment submitted successfully.",
                "payment": PaymentAdminListSerializer(
                    payment, context={"request": request}
                ).data,
            },
            status=status.HTTP_201_CREATED,
        )


class AdminPaymentListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        qs = Payment.objects.select_related("user", "appointment")
        return Response(PaymentAdminListSerializer(qs, many=True, context={"request": request}).data)


class AdminApprovePaymentView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request, pk):
        payment = get_object_or_404(Payment.objects.select_related("appointment"), pk=pk)
        with transaction.atomic():
            payment.status = Payment.Status.APPROVED
            payment.save(update_fields=["status", "updated_at"])
            appointment: Appointment = payment.appointment
            appointment.is_paid = True
            appointment.save(update_fields=["is_paid", "updated_at"])
        return Response(
            {
                "message": "Payment approved.",
                "payment": PaymentAdminListSerializer(
                    payment, context={"request": request}
                ).data,
            }
        )


class AdminRejectPaymentView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request, pk):
        payment = get_object_or_404(Payment.objects.select_related("appointment"), pk=pk)
        with transaction.atomic():
            payment.status = Payment.Status.REJECTED
            payment.save(update_fields=["status", "updated_at"])
            appointment: Appointment = payment.appointment
            appointment.is_paid = False
            appointment.save(update_fields=["is_paid", "updated_at"])
        return Response(
            {
                "message": "Payment rejected.",
                "payment": PaymentAdminListSerializer(
                    payment, context={"request": request}
                ).data,
            }
        )

