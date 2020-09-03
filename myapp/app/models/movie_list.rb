class MovieList < ApplicationRecord
    validates :title, presence: true
    has_many :movies
end
