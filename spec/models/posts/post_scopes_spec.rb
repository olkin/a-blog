require 'rails_helper'

describe 'Post scopes' do
  let!(:post) { create :post }
  let!(:system_post) { create :post, :system }

  it 'returns correct posts' do
    expect(Post.system).to eq [system_post]
  end
end
