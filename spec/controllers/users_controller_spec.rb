require 'rails_helper'

describe UsersController do
  let(:user) { create :user }

  describe 'GET #show' do
    it 'shows user\'s page' do
      get :show, params: { id: user.to_param }

      expect(response).to have_http_status :ok
    end
  end
end