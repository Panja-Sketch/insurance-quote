from django.db import models

class InsurancePlan(models.Model):
    name = models.CharField(max_length=100)
    base_premium = models.FloatField()
    coverage_amount = models.FloatField()

    def __str__(self):
        return self.name
