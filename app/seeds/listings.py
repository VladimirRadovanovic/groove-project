from app.models import db, Listing


def seed_listings():
    listing1 = Listing(
        seller_id=1, artist='Doors', album='Brake on through', genre='Rock',
        description='Must listen this on a vinyl in order to appreciate it for real!!!',
        condition='New', price=25.99, num_copies_available=3
    )
    listing2 = Listing(
        seller_id=1, artist='Ramones', album='I want to be sedated', genre='Rock',
        description='A must, must, must listen!!!',
        condition='New', price=21.99, num_copies_available=5
    )
    listing3 = Listing(
        seller_id=1, artist='Beatles', album='Yellow Submarine', genre='Rock',
        description='Classic!!!',
        condition='New', price=24.99, num_copies_available=8
    )
    db.session.add(listing1)
    db.session.add(listing2)
    db.session.add(listing3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
