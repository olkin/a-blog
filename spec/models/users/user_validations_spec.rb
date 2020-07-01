require 'rails_helper'

describe 'User validations' do
  subject { user }

  let(:user) { build :user }

  context 'without email' do
    before do
      user.email = nil
    end

    it { is_expected.to be_invalid }

    context 'when another user with same email exists' do
      let(:another_user) { create :user }

      before do
        user.email = another_user.email
      end

      it { is_expected.to be_invalid }
    end
  end

  context 'without password' do
    before do
      user.password = nil
    end

    it { is_expected.to be_invalid }
  end
end
