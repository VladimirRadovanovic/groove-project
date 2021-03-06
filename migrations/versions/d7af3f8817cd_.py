"""empty message

Revision ID: d7af3f8817cd
Revises: b400161d7ddb
Create Date: 2022-02-21 13:51:57.205161

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7af3f8817cd'
down_revision = 'b400161d7ddb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('delivery_instructions', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'delivery_instructions')
    # ### end Alembic commands ###
