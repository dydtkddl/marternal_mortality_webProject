# Generated by Django 4.2.13 on 2024-05-16 17:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Scenario",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "subsystem",
                    models.CharField(
                        choices=[
                            ("Complication", "Complication"),
                            ("Precondition", "Precondition"),
                            ("Medicine", "Medicine"),
                            ("Facility", "Facility"),
                            ("Socioeconomic", "Socioeconomic"),
                            ("HumanResource", "Human Resource"),
                            ("Individual", "Individual"),
                        ],
                        max_length=20,
                    ),
                ),
                ("detail", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="SurveyResponse",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("occurrence", models.IntegerField()),
                ("severity", models.IntegerField()),
                ("detection", models.IntegerField()),
                (
                    "scenario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.scenario"
                    ),
                ),
            ],
        ),
    ]