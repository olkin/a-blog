Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'
  get :sign_in, to: 'home#index'
  get :sign_up, to: 'home#index'
  root to: 'home#index'

  resources :events, to: 'home#index' do
    resources :event_teams, path: :teams, only: :index
    
    member do
      get :register
    end
  end

  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :destroy, :show, :update, :create] do
        resources :registrations, only: [:create, :index]
        resources :event_teams, path: :teams, only: :index

        member do
          post :accept_all
        end
      end
    end
  end
end
