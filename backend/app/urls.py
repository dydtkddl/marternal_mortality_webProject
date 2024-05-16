from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScenarioViewSet, SurveyResponseViewSet,get_subsystem_choices

router = DefaultRouter()
router.register(r'scenarios', ScenarioViewSet)
router.register(r'survey_responses', SurveyResponseViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('subsystem_choices/', get_subsystem_choices),
]