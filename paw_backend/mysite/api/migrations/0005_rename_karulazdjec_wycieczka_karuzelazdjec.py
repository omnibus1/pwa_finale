# Generated by Django 4.2.2 on 2024-01-06 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_rename_username_komentarz_email"),
    ]

    operations = [
        migrations.RenameField(
            model_name="wycieczka",
            old_name="karulaZdjec",
            new_name="karuzelaZdjec",
        ),
    ]
