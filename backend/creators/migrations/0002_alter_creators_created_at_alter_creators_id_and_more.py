# Generated by Django 5.1 on 2024-09-04 20:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("creators", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="creators",
            name="created_at",
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="creators",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterModelTable(
            name="creators",
            table="creatorverse1",
        ),
    ]
