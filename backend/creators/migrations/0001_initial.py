# Generated by Django 5.1.1 on 2024-09-06 23:07

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Creators",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("created_at", models.TextField()),
                ("name", models.TextField()),
                ("url", models.TextField()),
                ("description", models.TextField()),
                ("imageurl", models.TextField()),
            ],
        ),
    ]
