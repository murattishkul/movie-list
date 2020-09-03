class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.references :movie_list, foreign_key: true

      t.timestamps
    end
  end
end
