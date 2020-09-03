5.times do
    MovieList.create({
        title: Faker::Book.title,
    })
  end