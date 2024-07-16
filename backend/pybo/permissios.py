from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_authenticated
        )
    
    def has_object_permission(self, request, view, obj):     
        if request.method in SAFE_METHODS:
            return True   
        
        if not request.user.is_authenticated:
            return False

        author = obj.user
        if author == None:
            return False
        
        return bool(request.user==author)