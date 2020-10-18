Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'hello#index'

  get '/intake', to: 'intake#new'
  post '/intake', to: 'intake#create'
  get '/builder', to: 'builder#index'
  get '/questions',  to: 'questions#index'
  post '/questions', to: 'questions#create'
  get '/questions/download_csv', to: 'questions#download_csv'
  put '/questionnaire/:id', to: 'questionnaire#update'
  get '/questionnaire/:id', to: 'questionnaire#show'
  get '/questionnaire/:id/redcap', to: 'questionnaire#redcap'
  resources :menu_items, only: [:index, :new, :create]
  get '/menu_items/show_new', to: 'menu_items#show_new'
  # get '/questionnaire/standard', to: 'questionnaire#standard'

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
