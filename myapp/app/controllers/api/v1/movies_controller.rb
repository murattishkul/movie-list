module Api
    module V1
        class MoviesController < ApplicationController
            before_action :get_movie_list
            before_action :get_movie, only: [:show, :edit, :update, :destroy]

            def index
                @movies = @movie_list.movies
                render json: {
                    status: "SUCCESS",
                    message: "Your movies of a movie list",
                    data: @movies
                }, status: :ok
            end

            def show
                render json: {status: 'SUCCESS', message:'Loaded movie', data:@movie},status: :ok
            end

            def new # show a new tweet form
                @movie = Movie.new
            end

            def create
                @movie = @movie_list.movies.new(movies_params)
        
                if @movie.save
                  render json: {status: 'SUCCESS', message:'Saved movie', data:@movie},status: :ok
                else
                  render json: {status: 'ERROR', message:'Movie not saved', data:@movie.errors},status: :unprocessable_entity
                end
            end

            def destroy
            #   movie_list = MovieList.find(params[:id])
              @movie.destroy
              render json: {status: 'SUCCESS', message:'Deleted movie list', data:@movie},status: :ok
            end
      
            def update
              if @movie.update_attributes(movies_params)
                render json: {status: 'SUCCESS', message:'Updated movie list', data:@movie},status: :ok
              else
                render json: {status: 'ERROR', message:'Movie list not updated', data:@movie.errors},status: :unprocessable_entity
              end
            end

            private

            def movies_params
              params.require(:movie).permit(:title)
            end

            def get_movie_list
                @movie_list = MovieList.find(params[:movie_list_id])
            end

            def get_movie
                @movie = Movie.find(params[:id])
            end 

        end
    end
end