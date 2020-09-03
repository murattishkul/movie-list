Rails.application.routes.draw do
  namespace 'api' do
    namespace "v1" do
      resources :movie_lists do
        resources :movies 
      end
    end
  end
end
