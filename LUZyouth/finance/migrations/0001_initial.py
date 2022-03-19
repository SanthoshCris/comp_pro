# Generated by Django 3.1.7 on 2021-10-01 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FinanceDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date', models.CharField(max_length=50)),
                ('amount', models.IntegerField()),
                ('status', models.CharField(max_length=10)),
                ('feedback', models.CharField(max_length=200)),
                ('month', models.IntegerField()),
                ('week', models.IntegerField()),
                ('year', models.IntegerField()),
            ],
        ),
    ]
