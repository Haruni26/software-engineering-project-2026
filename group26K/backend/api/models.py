from django.db import models
from django.contrib.gis.db import models

class Sighting(models.Model):
    species = models.CharField(max_length=120)
    location = models.PointField(srid=4326) 
    def __str__(self):
        return f"{self.species}"


class ImportantLocation(models.Model):
    name = models.CharField(max_length=120, blank=True, default="")
    location = models.PointField(srid=4326)

    def __str__(self):
        return self.name or f"Important Location({self.location.x:.5f}, {self.location.y:.5f})"
