import logging
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import InsurancePlan

logger = logging.getLogger(__name__)

class QuoteCalculator(APIView):
    def post(self, request):
        logger.info(f"Received data: {request.data}")

        age = request.data.get('age')
        plan_id = request.data.get('plan_id')
        coverage_amount = request.data.get('coverage_amount')

        if not all([age, plan_id, coverage_amount]):
            return Response({"error": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            plan = InsurancePlan.objects.get(id=plan_id)
            quote = plan.base_premium * (coverage_amount / plan.coverage_amount) * (1 + age * 0.01)
            return Response({"quote": quote}, status=status.HTTP_200_OK)
        except InsurancePlan.DoesNotExist:
            return Response({"error": "Plan not found"}, status=status.HTTP_404_NOT_FOUND)
