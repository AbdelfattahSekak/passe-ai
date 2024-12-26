import getLocationInfo from "~/server/utils/tripAdvisor";

export default defineEventHandler(async (event) => {
  try {
    const locationId = getRouterParam(event, "id");
    if (!locationId) {
      return new Response("Bad Request", { status: 400 });
    }
    return await getLocationInfo(locationId);
  } catch (error) {
    logger.error("Location fetch API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
