"""empty message

Revision ID: 2fbf84bf3b5f
Revises: d7254805f25e
Create Date: 2022-02-15 14:03:38.728816

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2fbf84bf3b5f'
down_revision = 'd7254805f25e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('listings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.Column('artist', sa.String(length=100), nullable=False),
    sa.Column('album', sa.String(length=100), nullable=False),
    sa.Column('genre', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('condition', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Numeric(), nullable=False),
    sa.Column('num_copies_available', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('listings')
    # ### end Alembic commands ###