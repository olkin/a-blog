require 'rails_helper'

describe 'Post associations' do
  let(:post) { build :post }

  describe '#user' do
    subject { post.user }

    it { is_expected.to be_a User }
  end
end

