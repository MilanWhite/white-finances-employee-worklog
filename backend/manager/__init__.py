from flask import Blueprint

# Import the blueprint and any utils you want to expose
from manager.routes import manager_bp

# Define __all__ to specify what this package exports
__all__ = ["manager_bp"]