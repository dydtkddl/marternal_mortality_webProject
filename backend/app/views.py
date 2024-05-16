from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Scenario, SurveyResponse
from .serializers import ScenarioSerializer, SurveyResponseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Scenario

@api_view(['GET'])
def get_subsystem_choices(request):
    choices = Scenario.SUBSYSTEM_CHOICES
    return Response(choices)
class ScenarioViewSet(viewsets.ModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer

class SurveyResponseViewSet(viewsets.ModelViewSet):
    queryset = SurveyResponse.objects.all()
    serializer_class = SurveyResponseSerializer