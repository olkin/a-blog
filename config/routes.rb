Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :dashboard, to: 'dashboard#show'
  root to: 'home#index'



    # resources :posts, only: [:create, :edit, :destroy, :update]
end
