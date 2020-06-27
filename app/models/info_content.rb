class InfoContent < ApplicationRecord
  include Postable

  has_one :post, as: :postable
end