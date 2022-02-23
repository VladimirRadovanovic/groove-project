"""empty message

Revision ID: 29cd9d932e6c
Revises: 801cce000f6b
Create Date: 2022-02-22 13:50:06.307692

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29cd9d932e6c'
down_revision = '801cce000f6b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('address', sa.String(length=100), nullable=False))
    op.add_column('users', sa.Column('city', sa.String(length=100), nullable=False))
    op.add_column('users', sa.Column('state', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('zip_code', sa.String(length=100), nullable=False))
    op.add_column('users', sa.Column('country', sa.String(length=100), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'country')
    op.drop_column('users', 'zip_code')
    op.drop_column('users', 'state')
    op.drop_column('users', 'city')
    op.drop_column('users', 'address')
    # ### end Alembic commands ###