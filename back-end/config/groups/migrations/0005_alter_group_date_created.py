# Generated by Django 4.2.2 on 2023-07-03 11:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0004_alter_group_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='date_created',
            field=models.DateField(default=datetime.datetime(2023, 7, 3, 11, 19, 54, 388441)),
        ),
    ]
