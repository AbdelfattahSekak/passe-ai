import { getLocationDetails } from "~/server/utils/tripAdvisor";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    if (!id) {
      return new Response("Bad Request", { status: 400 });
    }
    const locationInfo = await getLocationDetails(id);
    if (!locationInfo) {
      return new Response("Not Found", { status: 404 });
    }
    return locationInfo;
  } catch (error) {
    logger.error("Location fetch API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
