# require 'rails_helper'
#
# describe Api::V1::PostsController do
#   let(:user) { create :user }
#   let(:user_post) { create :post, user: user }
#
#   before do
#     sign_in_as(user)
#   end
#
#   describe 'POST #create' do
#     it 'creates the post' do
#       expect { post :create, params: { post: { body: 'hello', title: 'title' } } }.
#           to change { user.posts.count }.by(1)
#
#       expect(response).to have_http_status :found
#     end
#
#     context 'when Post data is invalid' do
#       it 'does not save invalid post, shows error message' do
#         allow_any_instance_of(Post).to receive(:valid?) { false }
#
#         expect { post :create, params: { post: { body: 'hello', title: 'title' } } }.
#             not_to change { user.posts.count }
#
#         expect(flash[:error]).to eq 'Oopsie'
#         expect(response).to have_http_status :ok
#       end
#     end
#   end
#
#   describe 'GET #edit' do
#     it 'finds posts' do
#       get :edit, params: { id: user_post.to_param }
#
#       expect(response).to have_http_status :ok
#     end
#   end
#
#   describe 'PATCH #update' do
#     it 'finds posts' do
#       put :update, params: { id: user_post.to_param, post: { body: 'hello', title: 'title' } }
#
#       expect(response).to have_http_status :found
#     end
#   end
#
#   describe 'DELETE #destroy' do
#     let!(:user_post) { create :post, user: user }
#
#     it 'finds posts' do
#       expect { delete :destroy, params: { id: user_post.to_param } }.
#           to change { user.posts.count }.by(-1)
#
#       expect(response).to have_http_status :found
#     end
#   end
# end