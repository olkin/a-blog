Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :sign_in, to: 'home#index'
  get :sign_up, to: 'home#index'
  root to: 'home#index'

  resources :events, to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :destroy, :show, :update, :create]
      resources :events, only: [:index, :destroy, :show, :update, :create]
    end
  end
end
