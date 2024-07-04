from rest_framework import pagination

class OffsetLimitWithMaxPagination(pagination.LimitOffsetPagination):
    max_limit = 100