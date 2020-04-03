require 'rails_helper'

describe DashboardsController do
  let(:user) { create :user }

  before do
    sign_in_as(user)
  end

  describe 'GET #show' do
    let!(:post) { create :post, user: user }

    it 'assigns posts' do
      get :show

      expect(response).to have_http_status :ok
    end
  end
end