class Movie < ApplicationRecord
    validates :title, presence: true
    belongs_to :movie_list
end
