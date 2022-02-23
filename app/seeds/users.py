from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        address='77 Ocean Ave.', city='Oak Bluffs', state='Massachusets',
        zip_code='02567', country='USA'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        address='62 Seaview Ave.', city='Miami', state='Florida',
        zip_code='09961', country='USA'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        address='5 Farm Rd.', city='Vail', state='Colorado',
        zip_code='09977', country='USA'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
