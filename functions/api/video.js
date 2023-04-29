export async function onRequest(context) {
  // Get the video name from the request URL
  const videoName = context.request.url.pathname.slice(1);

  // Check if the video name is valid
  if (!videoName) {
    return new Response("Missing video name", { status: 400 });
  }

  // Get the video URL from the bucket
  const url = await context.env.R2_BUCKET.url(videoName);

  // Redirect to the video URL
  return Response.redirect(url);
}