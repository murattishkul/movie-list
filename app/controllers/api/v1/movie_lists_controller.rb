module Api
    module V1
        class MovieListsController < ApplicationController
            def index
                movie_lists = MovieList.order('created_at DESC')
                render json: {
                    status: "SUCCESS",
                    message: "Your movie lists",
                    data: movie_lists
                }, status: :ok
            end

            def show
                movie_list = MovieList.find(params[:id])
                render json: {status: 'SUCCESS', message:'Loaded movie list', data:movie_list},status: :ok
            end

            def create
                movie_list = MovieList.new(movie_list_params)
        
                if movie_list.save
                  render json: {status: 'SUCCESS', message:'Saved movie list', data:movie_list},status: :ok
                else
                  render json: {status: 'ERROR', message:'MovieList not saved', data:movie_list.errors},status: :unprocessable_entity
                end
            end

            def destroy
              movie_list = MovieList.find(params[:id])
              movie_list.destroy
              render json: {status: 'SUCCESS', message:'Deleted movie list', data:movie_list},status: :ok
            end
      
            def update
              movie_list = MovieList.find(params[:id])
              if movie_list.update_attributes(movie_list_params)
                render json: {status: 'SUCCESS', message:'Updated movie list', data:movie_list},status: :ok
              else
                render json: {status: 'ERROR', message:'Movie list not updated', data:movie_list.errors},status: :unprocessable_entity
              end
            end

            private

            def movie_list_params
              params.permit(:title)
            end

        end
    end
end
