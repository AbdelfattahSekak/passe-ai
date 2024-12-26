import { getLocationPhotos } from "~/server/utils/tripAdvisor";

export default defineEventHandler(async (event) => {
  try {
    const mediaId = getRouterParam(event, "id");
    if (!mediaId) {
      return new Response("Bad Request", { status: 400 });
    }
    return await getLocationPhotos(mediaId);
  } catch (error) {
    logger.error("Media fetch API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
