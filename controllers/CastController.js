import prisma from "../Db/db.config.js";

// create a new cast
export const store = async (req, res) => {
  const { cast, description, movieId } = req.body;

  // Check if all required fields are provided
  if (!cast || !description || !movieId) {
    return res.status(400).json({
      status: 400,
      message: "Missing required fields: cast, description, movieId",
    });
  }

  const newCast = await prisma.cast.create({
    data: {
      cast,
      description,
      movieId,
    },
  });

  return res.json({
    status: 200,
    cast: newCast,
    message: "cast created successfully",
  });
};

// get the cast
export const index = async (req, res) => {
  const newCast = await prisma.cast.findMany({
    include: {
      movie: true,
    },
  });
  return res.json({
    status: 200,
    newCast,
    message: "cast retrieved successfully",
  });
};

// update a cast
export const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, movieId } = await req.body;
  const cast = await prisma.cast.update({
    where: {
      id: id,
    },
    data: {
      name,
      description,
      movieId,
    },
  });
  return res.json({
    status: 200,
    cast,
    message: "cast updated successfully",
  });
};

//  delete a cast
export const deletecast = async (req, res) => {
  const { id } = req.params;
  await prisma.cast.delete({
    where: {
      id: id,
    },
  });
  return res.json({
    status: 200,
    message: "cast deleted successfully",
  });
};
