require 'spec_helper'

describe User do
  it 'has valid factory' do
    expect(build(:user)).to be_valid
    expect(create(:user)).to be_valid
  end
end

