# Generated by Django 3.1.7 on 2021-10-23 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0003_auto_20211018_0012'),
    ]

    operations = [
        migrations.AddField(
            model_name='expensesdetails',
            name='expense_for',
            field=models.CharField(default='', max_length=200),
        ),
    ]