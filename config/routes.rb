Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'hello#index'

  get '/intake', to: 'intake#new'
  post '/intake', to: 'intake#create'
  get '/builder', to: 'builder#index'
  get '/questions',  to: 'questions#index'
  put '/questionnaire/:id', to: 'questionnaire#update'
  get '/questionnaire/:id', to: 'questionnaire#show'
  get '/questionnaire/:id/redcap', to: 'questionnaire#redcap'

  namespace :admin do
    get '/dashboard', to: 'dashboard#index'
    post '/dashboard', to: 'dashboard#upload'
    get '/dashboard/sample_csv', to: 'dashboard#sample_csv'

    namespace :dashboard do
      resources :tags
      resources :questions, only: [:index, :destroy]
      get '/questions/nuke', to: 'questions#nuke'
    end
  end
end
