from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.Boolean, default=True)

    department = db.relationship('Department', back_populates='employees')
    attendance_records = db.relationship('Attendance', back_populates='employee')


class Manager(db.Model):
    __tablename__ = 'managers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=True)

    department = db.relationship('Department', back_populates='manager')


class Department(db.Model): # might be unneccessary
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('managers.id'), nullable=True)

    manager = db.relationship('Manager', back_populates='department')
    employees = db.relationship('Employee', back_populates='department')
    shifts = db.relationship('ScheduledShift', back_populates='department')


class ScheduledShift(db.Model):
    __tablename__ = 'scheduled_shifts'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    shift_start = db.Column(db.DateTime, nullable=False)
    shift_end = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.Date, nullable=False)

    employee = db.relationship('Employee')
    department = db.relationship('Department', back_populates='shifts')


class Attendance(db.Model):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    punch_in_time = db.Column(db.DateTime, nullable=False)
    punch_out_time = db.Column(db.DateTime, nullable=True)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    employee = db.relationship('Employee', back_populates='attendance_records')
