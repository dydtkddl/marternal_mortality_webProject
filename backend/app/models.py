from django.db import models

class Scenario(models.Model):
    SUBSYSTEM_CHOICES = [
        ('Complication', 'Complication'),
        ('Precondition', 'Precondition'),
        ('Medicine', 'Medicine'),
        ('Facility', 'Facility'),
        ('Socioeconomic', 'Socioeconomic'),
        ('HumanResource', 'Human Resource'),
        ('Individual', 'Individual'),
    ]

    subsystem = models.CharField(max_length=20, choices=SUBSYSTEM_CHOICES)
    detail = models.TextField()

    def __str__(self):
        return self.detail


class SurveyResponse(models.Model):
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)
    occurrence = models.IntegerField()
    severity = models.IntegerField()
    detection = models.IntegerField()

    def __str__(self):
        return f"Response to {self.scenario.detail}"