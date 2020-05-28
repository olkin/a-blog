Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :sign_in, to: 'home#index'
  get :sign_up, to: 'home#index'
  root to: 'home#index'

    # resources :posts, only: [:create, :edit, :destroy, :update]
end
