import prisma from "../Db/db.config.js";

// create a new movie
export const store = async (req, res) => {
  const { name } = req.body;
  const movie = await prisma.movie.create({
    data: {
      name,
    },
  });

  return res.json({
    status: 200,
    movie,
    message: "Movie created successfully",
  });
};

// get the movies
export const index = async (req, res) => {
  const page = req.params.page || 1;
  const limit = req.params.limit || 1;

  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    limit = 1;
  }

  const skip = (page - 1) * limit;

  const movies = await prisma.movie.findMany({
    take: limit,
    skip: skip,
    include: {
      Cast: {
        select: {
          cast: true,
          description: true,
        },
      },
    },
  });
  const totalMovies = await prisma.movie.count();
  const totalPages = Math.ceil(totalMovies / limit);

  return res.json({
    status: 200,
    movies,
    message: "Movies retrieved successfully",
    metadata: {
      limit,
      currentPage: page,
      totalPages,
    },
  });
};

// update a movie
export const update = async (req, res) => {
  const { id } = req.params;
  const { name } = await req.body;
  const movie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  return res.json({
    status: 200,
    movie,
    message: "Movie updated successfully",
  });
};

//  delete a movie
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await prisma.movie.delete({
    where: {
      id: id,
    },
  });
  return res.json({
    status: 200,
    message: "Movie deleted successfully",
  });
};

// search for a movie by name

export const searchMovie = async (req, res) => {
  const query = req.query.q;
  const movies = await prisma.movie.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  return res.json({
    status: 200,
    movies,
    message: "Movie retrieved successfully",
  });
};
