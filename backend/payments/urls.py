from django.urls import path

from .views import (
    AdminApprovePaymentView,
    AdminPaymentListView,
    AdminRejectPaymentView,
    SubmitPaymentView,
)

urlpatterns = [
    path("submit/", SubmitPaymentView.as_view(), name="payments_submit"),
    path("admin/list/", AdminPaymentListView.as_view(), name="payments_admin_list"),
    path("admin/<uuid:pk>/approve/", AdminApprovePaymentView.as_view(), name="payments_admin_approve"),
    path("admin/<uuid:pk>/reject/", AdminRejectPaymentView.as_view(), name="payments_admin_reject"),
]

