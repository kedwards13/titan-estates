from django.db import models

class Property(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    details = models.TextField()
    asking_price = models.DecimalField(max_digits=10, decimal_places=2)
    additional_comments = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Lead(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

