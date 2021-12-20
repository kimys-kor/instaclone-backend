import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, {}, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userid: true,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found.",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.photo.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
