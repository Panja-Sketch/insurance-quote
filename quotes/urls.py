from django.urls import path
from .views import QuoteCalculator

urlpatterns = [
    path('calculate-quote/', QuoteCalculator.as_view(), name='calculate-quote'),
]
